'use strict';


const form =document.getElementById('form');
const table = document.getElementById('table');
const tHedaer = ['#' , 'Name' , 'Images' , 'Season'];

let Flowers = function (name , image , season){
    this.name=name;
    this.image=`./img/${image}.jpeg`;
    this.season=season;
    Flowers.all.push(this);
}
Flowers.all=[];

function tableHead(){
    let thHeader = document.createElement('tr');
    for(let i =0 ; i<tHedaer.length ; i++){
        let thE1 = document.createElement('th');
        thHeader.appendChild(thE1);
        thE1.textContent=tHedaer[i];
        table.appendChild(thHeader);
    }
}

function renderCategories(){
    table.innerHTML='';
    tableHead();
    for (let i=0 ; i< Flowers.all.length ; i++){
        let trE1 = document.createElement('tr');
        let tdE1 = document.createElement('th');
        let deleteButton = document.createElement('button');
        deleteButton.setAttribute('id' , Flowers.all[i].name);
        deleteButton.textContent='x';
        trE1.appendChild(deleteButton);
        table.appendChild(trE1);
        let tdE2=document.createElement('td');
        trE1.appendChild(tdE2);
        let img =document.createElement('img');
        img.src=Flowers.all[i].image;
        tdE2.appendChild(img);
        trE1.appendChild(tdE1);
        tdE1.textContent=Flowers.all[i].name;
        let tdE3 = document.createElement('td');
        trE1.appendChild(tdE3);
        tdE3.textContent=Flowers.all[i].season;
        deleteButton.addEventListener('click' , deleteRow);
        function deleteRow(){
            Flowers.all.splice( i,1 );
            getList();
            trE1.innerHTML='';
        }
    }
}


form.addEventListener('submit' , eventButton );
function eventButton (event){
    event.preventDefault();
    let flowerName = event.target.Name.value;
    let flowerImages = event.target.Images.value;
    let flowerSeason = event.target.Season.value;
    new Flowers(flowerName,flowerImages,flowerSeason);
    getList();
    renderCategories();
}


function getList (){
    localStorage.setItem('Flowers' , JSON.stringify(Flowers.all));
}

function getForm (){
    Flowers.all=JSON.parse(localStorage.getItem ('Flowers')) || [];
    renderCategories();
}

getForm();