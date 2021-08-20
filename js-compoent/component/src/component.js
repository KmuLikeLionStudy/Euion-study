export default class Component {
    li;     //표적 target
    div;    // prop
    delbtn; //상태
    listNum;
    toDoObj;

    showingList(li, div,delbtn){
        this.li = li;
        this.div = div;
        this.setup();
        this.setEvent();
        this.render();
    }
    setup () {};
    mounted () {};
    template () { return ''; }
    render(){
        this.li.innerHTML = this.template();
        this.mounted();
    }
    setEvent(){};
    setState(newstate){
        this.delbtn = {...this.delbtn, ...newstate};
        this.render();
    }
    addEvent(eventType, selector, callback){
        const children = [...this.delbtn.querySelectorAll(selector)];
        const isTarget = (delbtn) => children.includes(delbtn) || delbtn.closest(selector);
        this.delbtn.addEventListener(eventType, event =>{
            if(isTarget(event.delbtn)) return false;
            callback(event);
        })
    }
}