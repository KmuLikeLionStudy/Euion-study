import Component from "../component.js";

export default class Items extends Component {
    template(){
        const { loadList } = this.div;
        return `
        <ul>
        ${loadList.map(({li, delbtn, listNum}) => `
          <li data-seq="${listNum}">
            ${li}
            <button class="toggleBtn" style="color: ${delbtn ? '#09F' : '#F09'}">
              ${delbtn ? '활성' : '비활성'}
            </button>
            <button class="deleteBtn">삭제</button>
          </li>
        `).join('')}
      </ul>
    `        
    }

    setEvent() {
        const { deleteList, handlesubmits } = this.div;
    
        this.addEvent('click', '.deleteBtn', ({li}) => {
          deleteList(Number(li.closest('[data-seq]').dataset.listNum));
        });
    
        this.addEvent('click', '.toggleBtn', ({li}) => {
          handlesubmits(Number(li.closest('[data-seq]').dataset.listNum));
        });
    
      }
}