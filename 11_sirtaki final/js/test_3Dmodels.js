AFRAME.registerComponent('model_test', {
    schema: {
          audio: {type: 'string', default: ''},
          delai: {type: 'number', default: 1000},
          animdata: {type: 'string', default: ''},
    },
    init: function() {
        var el = this.el;
        const selectModel = document.querySelector('#idModel');
        const selectAction = document.querySelector('#idAction');
        selectModel.addEventListener('change', (event) => {
            console.log(">>>> new model3D = "+event.target.value);
            el.removeAttribute('gltf-model');
            el.setAttribute('gltf-model', event.target.value);
            var data = "clip: idle; crossFadeDuration: 0.3; timeScale: 0.5;";
            selectAction.value = ""
            el.removeAttribute('animation-mixer');
            el.setAttribute('animation-mixer', data);

        });
        selectAction.addEventListener('change', (event) => {
            var data = "clip: "+event.target.value+"; crossFadeDuration: 0.3; timeScale: 0.5;";
            // var data = "clip: "+event.target.value+";";
            console.log(">>>> new action = "+data);
            el.removeAttribute('animation-mixer');
            el.setAttribute('animation-mixer', data);
        });
    }
});
