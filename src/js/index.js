let canvas = document.querySelector('canvas');
let mood = 50;

let balance = 100000;

let width = 450;
let height = 45;

canvas.width = width;
canvas.height = height;

let ctx = canvas.getContext("2d");

class Item{
    constructor(id, name, price, mood_change, img_link){
        this.id = id;
        this.name = name;
        this.price = price;
        this.mood_change = mood_change;
        this.img_link = img_link;
        this.count = 0;
    }
    add_item(){
        if (balance - this.price >= 0){
            balance -= this.price;
            mood = mood + this.mood_change;
            this.count += 1;
        }
        update();
    }
    remove_item(){
        if (this.count - 1 >= 0){
            balance += this.price;
            mood = mood - this.mood_change;
            this.count -= 1;
        }
        update();
    }
}

let item0 = new Item(0, 'Гречка', 5, 1, 'src/img/grechka.png');
let item1 = new Item(1, 'IPhone', 1200, -5, 'src/img/iphone.png');
let item2 = new Item(2, 'Nuts', 2, 0.5, 'src/img/nuts.png');
let item3 = new Item(3, 'Комп', 1000, 10, 'src/img/comp.png');
let item4 = new Item(4, 'Ночь в отеле Дубайска', 10000, -10, 'src/img/hotel.png');
let item5 = new Item(5, 'Апельсиновый сок', 2, 0.5, 'src/img/orange.png');
let item6 = new Item(6, 'Ключ на 8', 5, 2, 'src/img/key.png');
let item7 = new Item(7, 'Катка в Дотку', 1, -10, 'src/img/dota2.png');

let items = [];
items.push(item0);
items.push(item1);
items.push(item2);
items.push(item3);
items.push(item4);
items.push(item5);
items.push(item6);
items.push(item7);

function update(){
    document.querySelector('#items').replaceChildren();
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#00ff55';
    ctx.fillRect(0, 0, width*mood/100, height);

    if (mood < 25){
        document.querySelector('#papich').src = 'src/img/4.png';
    }
    else if (mood < 50){
        document.querySelector('#papich').src = 'src/img/3.png';
    }
    else if ( mood < 75){
        document.querySelector('#papich').src = 'src/img/2.png';
    }
    else{
        document.querySelector('#papich').src = 'src/img/1.png';
    }

    document.querySelector('#balance').innerHTML = balance.toString() + '$';

    for (let i = 0; i < items.length; i++){
        let item = items[i];

        let item_div = document.createElement('div');
        item_div.className = 'item';
        item_div.setAttribute('item-id', item.id.toString());

        let item_img = document.createElement('img');
        item_img.src = item.img_link;

        let item_data_div = document.createElement('div');
        item_data_div.className = 'item-data';

        let span_name = document.createElement('span');
        span_name.className = 'item-name';
        span_name.innerHTML = item.name;

        let span_price = document.createElement('span');
        span_price.className = 'item-price';
        span_price.innerHTML = item.price.toString() + '$';

        let span_count = document.createElement('span');
        span_count.className = 'item-count';
        span_count.innerHTML = item.count;

        let item_buttons_div = document.createElement('div');
        item_buttons_div.className = 'item-buttons';

        let item_remove_button = document.createElement('button');
        item_remove_button.innerHTML = '-';
        item_remove_button.className = 'item-remove';
        item_remove_button.onclick = function() {item.remove_item()};

        let item_add_button = document.createElement('button');
        item_add_button.innerHTML = '+';
        item_add_button.className = 'item-add';
        item_add_button.onclick = function() {item.add_item()};

        item_buttons_div.appendChild(item_remove_button);
        item_buttons_div.appendChild(item_add_button);

        item_data_div.appendChild(span_name);
        item_data_div.appendChild(document.createElement('br'));
        item_data_div.appendChild(span_price);
        item_data_div.appendChild(document.createElement('br'));
        item_data_div.appendChild(span_count);
        item_data_div.appendChild(document.createElement('br'));
        item_data_div.appendChild(item_buttons_div);

        item_div.appendChild(item_img);
        item_div.appendChild(item_data_div);

        document.querySelector('#items').appendChild(item_div)
    }
}

update();

let modal = document.querySelector('#myModal');
let buy = document.querySelector('#buy')
let span = document.getElementsByClassName("close")[0];

buy.onclick = function() {
  let modal_content = document.querySelector('.modal-content');  
  modal_content.replaceChildren();
  let close = document.createElement('span');
  close.innerHTML = '&times;';
  close.className = 'close';
  close.onclick = function() {
    modal.style.display = "none";
  }
  let h1 = document.createElement('h1');
  h1.innerHTML = 'Вы купили: ';
  let ul = document.createElement('ul');
  for (let i = 0; i < items.length; i++){
    let item = items[i];
    if (item.count > 0){
        let li = document.createElement('li');
        let str = '"' + item.name + '"' + ' - ' + item.count.toString() + ' штук,'
        li.innerHTML = str
        ul.appendChild(li);
    }
  }
  let result = document.createElement('h1');
  if (mood >= 100 & balance <= 100){
    result.innerHTML = 'Вы смогли правильно потратить деньги Папича.'
    result.className = 'suckcess';
  }
  else{
    result.innerHTML = 'Вы не смогли правильно потратить деньги Папича. Вам даст пиздов 1вин и будт прав'
    result.className = 'eRRor';
  }
  modal_content.appendChild(close);
  modal_content.appendChild(h1);
  modal_content.appendChild(ul);
  modal_content.appendChild(result)
  modal.style.display = "block";
}


