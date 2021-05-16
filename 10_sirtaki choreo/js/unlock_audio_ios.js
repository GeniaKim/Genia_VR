function webAudioTouchUnlock (context)
{

    return new Promise(function (resolve, reject)
    {
        if (context.state === 'suspended' && 'ontouchstart' in window)
        {
            var unlock = function()
            {
                context.resume().then(function()
                {
                    document.body.removeEventListener('touchstart', unlock);
                    document.body.removeEventListener('touchend', unlock);

                    resolve(true);
                },
                function (reason)
                {
                    reject(reason);
                });
            };

            document.body.addEventListener('touchstart', unlock, false);
            document.body.addEventListener('touchend', unlock, false);
        }
        else
        {
            resolve(false);
        }
    });
}

function unlockAudioIOS(context) {
    console.log("contexte audio state : "+context.state);
    webAudioTouchUnlock(context).then(function (unlocked)
    {
        if(unlocked)
        {
            // AudioContext was unlocked from an explicit user action,
            // sound should start playing now
            console.log("contexte audio unlocked");
            alert("contexte audio unlocked");
        }
        else
        {
            // There was no need for unlocking, devices other than iOS
            console.log("contexte audio ok");
        }
    },
    function(reason)
    {
        console.error(reason);
    });
}
