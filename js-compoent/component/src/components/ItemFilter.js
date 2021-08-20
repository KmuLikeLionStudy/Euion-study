import Component from "../component.js";

export default class ItemFilter extends Component {
    template(){
        return `
        <button class="filterBtn" data-is-filter="0">전체 보기</button>
        <button class="filterBtn" data-is-filter="1">활성 보기</button>
        <button class="filterBtn" data-is-filter="2">비활성 보기</button>
        `        
    }
    setEvent(){
        const { init } = this.div;
        this.addEvent('click', '.filterBtn', ({ li }) => {
          init(Number(li.dataset.isFilter));
        });
    }
}