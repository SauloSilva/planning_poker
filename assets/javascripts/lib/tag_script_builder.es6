class TagScriptBuilder {
    constructor () {
        this.script = document.createElement('script');
        this.script.type = 'text/javascript';
        this.script.async = true;
    }

    addSrc (src, tag = null, callback) {
        this.script.src = src;

        this.script.addEventListener('load', (e) => {
            callback(null, e);
        }, false);

        tag = document.getElementsByTagName('script')[0];
        return tag.parentNode.insertBefore(this.script, tag)
    }
}
