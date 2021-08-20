import Component from "../component.js";

export default class ItemAppender extends Component {
    template(){
        return `<input type="text" class="appender" placeholder="아이템 내용 입력" />`;
    }
    setEvent(){
        const { showingList } = this.div;
        this.addEvent('')
        this.addEvent('keyup','appender',({key, li})=>{
            if(key !=='Enter') return;
            showingList(div.value);
        });
    }
}