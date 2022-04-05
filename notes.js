console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
let addbtn = document.getElementById('addbtn');

addbtn.addEventListener('click',function(e){

    let addtxt = document.getElementById('addtxt');
    let notes = localStorage.getItem("notes");
    if(notes == null)
     {   notesObj = []; }
    else
    {  notesObj = JSON.parse(notes);  } //json.parse converts the string into objects. 
    
    notesObj.push(addtxt.value);
    localStorage.setItem("notes",JSON.stringify(notesObj)); //json.stringify converts the notes which is an array into string because localStorage accept only strings 
    addtxt.value = " ";
    console.log(notesObj);

    showNotes();
}); 

function showNotes()
{ let notes = localStorage.getItem("notes");
   if(notes == null)
   {   notesObj = []; }
   else
   {  notesObj = JSON.parse(notes);  } 
  let html = "";
   // appending the card by forEach loop
  notesObj.forEach( function(elements,index) {
      //my-2 means margin of 2 from top-bottom(horizontally), mx-2 means margin of 2 from left-right(vertically) 
      html += `<div class="notecard my-2 mx-2 card" style="width: 18rem;">
                  <div class="card-body">
                    <h5 class="card-title">Notes ${index+1}</h5>
                    <p class="card-text">${elements}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete note</button>
                  </div>
               </div>`;
       });
    let notesElm = document.getElementById("notes");
    if(notesObj.length != 0)
      { notesElm.innerHTML = html ;  }
    else
      { notesElm = `Nothing to show! Use "Add a Note" section above to add notes.`; }
}
// Function to delete a note
function deleteNote(index) {
       console.log("I am deleting", index);
      let notes = localStorage.getItem("notes");
      if (notes == null) {
        notesObj = [];
      } else {
        notesObj = JSON.parse(notes);
      }
      notesObj.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      showNotes();
    } 

    let search = document.getElementById('searchTxt');
    search.addEventListener('input',function(){
        let inputVal = search.value.toLowerCase();
        console.log('Input Event Fired!',inputVal);

        let notecard = document.getElementsByClassName('notecard');
        Array.from(notecard).forEach(function(element){
           let cardTxt = element.getElementsByTagName("p")[0].innerText ;
           console.log(cardTxt);
           if(cardTxt.includes(inputVal))
             { element.style.display = 'block' ; }
           else
             { element.style.display = 'none';   }
        })
    })

     
