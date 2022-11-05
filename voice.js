// VoiceRSS Javascript SDK
const VoiceRSS = {
    speech: function(e) {
        this._validate(e)
    },
    _validate: function(e) {
        if (!e) throw "The settings are undefined";
        if (!e.src) throw "The text is undefined";
        if (!e.hl) throw "The language is undefined";
        if (e.c && "auto" != e.c.toLowerCase()) {
            var a = !1;
            switch (e.c.toLowerCase()) {
                case "mp3":
                    a = (new Audio).canPlayType("audio/mpeg").replace("no", "");
                    break;
                case "wav":
                    a = (new Audio).canPlayType("audio/wav").replace("no", "");
                    break;
                case "aac":
                    a = (new Audio).canPlayType("audio/aac").replace("no", "");
                    break;
                case "ogg":
                    a = (new Audio).canPlayType("audio/ogg").replace("no", "");
                    break;
                case "caf":
                    a = (new Audio).canPlayType("audio/x-caf").replace("no", "")
            }
            if (!a) throw "The browser does not support the audio codec " + e.c
        }
    }
};