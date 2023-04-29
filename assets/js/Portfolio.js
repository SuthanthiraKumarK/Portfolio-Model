'use strict';

// DOM ELEMENTS
const header = document.querySelector('.header');
const projectDivision = document.querySelector('.project_div_main');
const contactDivision = document.querySelector('.contact__section');
const moveToProject = document.querySelector('.movetoproj');
const moveToContact = document.querySelector('.movetocont');
const nameText = document.querySelector('.name');
const desnText = document.querySelector('.desn_p');

const projectDiv = projectDivision.getBoundingClientRect();
const contactDiv = contactDivision.getBoundingClientRect();
const headerDiv = header.getBoundingClientRect();


// EVENTS
window.addEventListener('scroll',function(){
    if (this.pageYOffset>=23){
        header.style.backgroundColor='rgb(29, 35, 37)';
        nameText.style.color = 'rgba(255, 255, 255)';
        desnText.style.color = 'rgba(255, 255, 255)';
    } else {
        header.style.backgroundColor='rgba(255, 255, 255)';
        nameText.style.color = 'rgba(0, 0, 0)';
        desnText.style.color = 'rgba(0, 0, 0)';
    }   
});

moveToProject.addEventListener('click',function(e){
    window.scrollTo(projectDiv.x,projectDiv.y-headerDiv.height);
});

moveToContact.addEventListener('click',function(e){
    window.scrollTo(contactDiv.x,contactDiv.y-headerDiv.height);
});


// FUNCTIONS
const textAnimation = function (x,time){
    const string = x.innerText;
    let curLetter = 0;
    let newString = "";

    setInterval(function(){
        newString+=string[curLetter];
            curLetter++;
            x.innerText=`${newString}`;
        if(curLetter>=string.length){
            newString='';
            curLetter=0;
    }},time);
};

textAnimation(desnText,200);


