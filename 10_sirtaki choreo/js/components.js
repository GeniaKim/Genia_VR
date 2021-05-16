<script content-type="text/javascript">
// ----------------------------------------------------------
// CHARGEMENT MODELE
// ----------------------------------------------------------
AFRAME.registerComponent('model_loaded', {
    init: function() {
        var el = this.el;
        el.addEventListener('model-loaded', () => {
            console.log(">>>> modele chargé "+el.id);
        });
        el.addEventListener('model-error', () => {
              console.log(">>>> modele erreur"+el.id);
            });
    }
});

// ----------------------------------------------------------
// ACTION FINIE _ LOOP FINIE
// ----------------------------------------------------------
var nb_loop = 0;
AFRAME.registerComponent('action_finished', {
    init: function() {
        var el = this.el;
        el.addEventListener('animation-finished', () => {
            console.log(">>>> action finie"+el.id);
            nb_loop = 0;
        });
        el.addEventListener('animation-loop', () => {
            nb_loop++;
            console.log(">>>> loop terminée n°"+nb_loop);
        });
    }
});

// ----------------------------------------------------------
// CHARGEMENT SON
// ----------------------------------------------------------
AFRAME.registerComponent('sound_loaded', {
  init: function () {
    var el = this.el;
    el.addEventListener('sound-loaded', () => {
      console.log(">>>> son chargé : "+el.id);
      var entity = document.querySelector('[sound]');
      entity.components.sound.playSound();
      });
    this.el.addEventListener('sound-error', () => {
        console.log(">>>> son erreur : "+el.id);
      });
    }
});

// ----------------------------------------------------------
// SHADOW MATERIAL : 1 parametre opacite
// ----------------------------------------------------------
AFRAME.registerComponent('shadow-material', {
	schema: {
		opacite: {type: 'number', default: 0.5}
	},
	init: function(){
		let el = this.el;
		let mesh = el.getObject3D('mesh');
		// console.log(mesh);
		if (!mesh){return;}
		mesh.material = new THREE.ShadowMaterial();
    	mesh.material.opacity = this.data.opacite;
    }
});

// ----------------------------------------------------------
// DEMARRAGE AUDIO (mouseenter) : 1 parametre audio = id de l'audio
// ----------------------------------------------------------
AFRAME.registerComponent('init_sound', {
  schema: {
      audio: {type: 'string', default: ''}
  },
  init: function () {
        var audio = this.data.audio;
        var el = this.el;
        el.addEventListener('mouseenter', function () {
            var son = document.getElementById(audio);
            var AudioContext = window.AudioContext || window.webkitAudioContext;
            var contexteAudio = new AudioContext;
            unlockAudioIOS(contexteAudio); // ok pour context = AudioContext;
            console.log(">>>> audio state : "+contexteAudio.state);
            if(contexteAudio.state == "suspended")
            {
                  contexteAudio.resume();
                  son.play();
                  console.log(">>>> SON ON : Playback resumed successfully");
            }
            else {
                  contexteAudio.suspend();
                  son.pause();
                  console.log(">>>> SON OFF : Playback paused successfully");
            }
        });
  }
});

// ----------------------------------------------------------
// DEMARRAGE ANIM (mouseleave) : 1 parametre anim-mixerAttribute
// ----------------------------------------------------------
AFRAME.registerComponent('init_anim', {
  schema: {
        objet: {type: 'string', default: ''},
        animdata: {type: 'string', default: ''}
  },
  init: function () {
      var objet = this.data.objet;
      var animdata = this.data.animdata;
      var el = this.el;
      el.addEventListener('mouseleave', function () {
          var cible = document.getElementById(objet);
          cible.removeAttribute("animation-mixer");
          cible.setAttribute("animation-mixer", animdata );
      }, {once : true});
  }
});
// ----------------------------------------------------------
// DEMARRAGE ANIM (delai après démarrage audio) :
// 3 parametres :
// - audio    = id de l'audio
// - delai    = attente en ms avant de lancer anim
// - animdata = attributs pour animation mixer
// ----------------------------------------------------------
AFRAME.registerComponent('init_anim_delai', {
  schema: {
        audio: {type: 'string', default: ''},
        delai: {type: 'number', default: 1000},
        animdata: {type: 'string', default: ''},
  },
  init: function () {
      var el = this.el;
      var delai = this.data.delai;
      var animdata = this.data.animdata;
      const son = document.getElementById(this.data.audio);
      son.addEventListener('playing', (event) => {
          setTimeout(function() {
              el.removeAttribute("animation-mixer");
              el.setAttribute("animation-mixer", animdata);
          }, delai);
      }, {once : true});
  }
});


</script>
