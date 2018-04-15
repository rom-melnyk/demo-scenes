class Navigation {
    constructor() {
        this.navEl = null;
        this.navHideTimer = null;

        this.scheduleNavHide = () => {
            this.navHideTimer = setTimeout(() => {
                this.navEl.classList.add('hidden');
                this.navHideTimer = null;
            }, 3000);
        };
        this.mouseOverListener = () => { clearTimeout(this.navHideTimer); };
        this.mouseOutListener = () => { this.scheduleNavHide(); };
        this.mouseMoveListener = () => {
            if (this.navHideTimer === null) {
                this.navEl.classList.remove('hidden');
                this.scheduleNavHide();
            }
        };
    }


    init() {
        this.navEl = document.querySelector('nav');
        this.scheduleNavHide();

        document.addEventListener('mousemove', this.mouseMoveListener);
        this.navEl.addEventListener('mouseover', this.mouseOverListener);
        this.navEl.addEventListener('mouseout', this.mouseOutListener);
    }


    addDemoScenes(demoscenes) {

    }


    removeDemoScenes() {

    }


    unmount() {
        clearTimeout(this.navHideTimer);
        this.navEl.classList.add('hidden');

        document.removeEventListener('mousemove', this.mouseMoveListener);
        this.navEl.removeEventListener('mouseover', this.mouseOverListener);
        this.navEl.removeEventListener('mouseout', this.mouseOutListener);
    }
}


const navigation = new Navigation();

module.exports = { navigation };
