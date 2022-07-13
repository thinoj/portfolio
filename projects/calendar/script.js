let change =0;let changeInYear = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
let value = 12;let values =0;
let month ;let year ;
const newEvent = GEI('newEvent');
const EditText = GEI('editText');
const Alert = GEI('alert');
const eventTitleInput = GEI('eventTitleInput');
const weekdays = ['Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday'];
const days = ['S' , 'M', 'T' , 'W' , 'T' , 'F' , 'S'];

const calendar = GEI('calendar');
const fromTime = GEI("from");
const toTime = GEI("to"); 
const allDay = GEI("allDay");
const newFromTime = GEI("newFrom");
const newToTime = GEI("newTo");
const newAllDay = GEI("newAllDay");
const eventtext = GEI('eventText');
const Edit = GEI("edit");
const overLap = GEI("overLap");
const overlapContainer= GEI("LapContainer");
const yearView = GEI("yearView");
let overlapping = true;
let timeString ;
let timeArray ;
let from;
let to;let all;
let tempString;let tempDate;


function GEI(id){
  return document.getElementById(id);
}


function openEvent(date){
  
  clicked =date;
  eventtext.innerHTML = '';
  let flag = true;

  for (const i of events) {
    if(i.date===clicked ){
        const eventForDay = events.find(e=>e.date===clicked);      
        flag = false; // boolean for indicating Event present in that particular day

        if(eventForDay) Alert.style.display = 'block';
        
        
        let eventWindow = document.createElement("div");
        eventWindow.classList.add("innerEvent");

        if(i.checked==true) eventWindow.innerHTML =  `${i.title},<br> TIMING : ALL DAY <br>`;
        else eventWindow.innerHTML =  `${i.title},<br> FROM : ${i.from} - TO : ${i.to}<br>`; 
        

        eventWindow.addEventListener("click" , function(){
          Alert.style.display = 'none';
          Edit.style.display = "block";
          let html = this; 
                   
          GEI('update').addEventListener("click" , function(){

           let tittle = html.innerHTML.split(",")[0]; 
            for (const j of events) {
              
              if(j.title===tittle){
                
                j.title = EditText.value;
                j.from = newFromTime.value;
                j.to  = newToTime.value;
                j.checked = newAllDay.checked;            
                exec();
                Edit.style.display = 'none';
              }
            }
            localStorage.setItem('events', JSON.stringify(events));
            
            EditText.value="";
          });
        })
        eventtext.appendChild(eventWindow);
    }
  }
    if(flag) newEvent.style.display = 'block';
}



function exec(){

  GEI("yearViewContainer").style.display = 'none';
  GEI("container").style.display = 'block';
  

  const dt = new Date();

  if(change!==0) dt.setMonth(new Date().getMonth() + change);
  if(changeInYear!==0) dt.setFullYear(new Date().getFullYear() + changeInYear);
  
  const date = dt.getDate();
  month = dt.getMonth(); 
  year = dt.getFullYear();
  const NoOfDays = new Date(year , month + 1, 0).getDate();
  const firstDay = new Date(year , month , 1);
  const dayString = firstDay.toLocaleDateString(`en-us`,{ weekday : 'long' ,});
  const paddingDays = weekdays.indexOf(dayString);

  let text = (dt.toLocaleDateString('en-us', { month: 'long' }));
  GEI('monthDisplay').innerText =`${text.toUpperCase()} ${year}`;

  calendar.innerHTML = ' ';
  GEI("monthD").selectedIndex = month;
  GEI("yearD").selectedIndex = (year%100)-1;

  for (let i = 1 ; i <=paddingDays+NoOfDays; i++){
       const daySquare = document.createElement('div');
       daySquare.setAttribute("id" , "day");
       daySquare.classList.add('day');

      const dateString = `${month +1}/${i- paddingDays}/${year}`;

       if(i > paddingDays){
          daySquare.innerText = i - paddingDays;
          
          if (i - paddingDays === date && year==2022 && change === 0) daySquare.id = 'currentDay';
         
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        for (const i of events)    
          if(i.date===dateString) eventDiv.innerHTML += `> ${i.title.toUpperCase()}<br>`;
          
        daySquare.appendChild(eventDiv);
        daySquare.addEventListener('click', () => openEvent(dateString));
       }else{
          daySquare.classList.add('padding');
       }
       calendar.appendChild(daySquare);
  }
}

function saveOnOverlap(){

    
    events.push({
      date: tempDate,
      title: tempString,
      from: fromTime.value,
      to:toTime.value,
      checked: allDay.checked,
    });
    
    localStorage.setItem('events', JSON.stringify(events));
}

function showOverlaps(date){
  let html =  `<h3 style="backround-color">Time Overlaps with</h3>`;
  overLap.innerHTML = html;
  for (const i of events) {
      
    if(i.date===date){
       const timeString1 =   `${i.from}:${i.to}`;
       const timeArray1 = timeString1.split(":");
       const from1 = timeArray1[0]*60+1*timeArray1[1];
       const to1 = timeArray1[2]*60+1*timeArray1[3]; 
       if(from>from1 && from<to1 || to>to1 && to<from1 || from1>from && to1 < to || from==from1 || to==to1){
          
          overLap.style.display = "block";
          Edit.style.display = "none";
          let newDiv = document.createElement("div");
          newDiv.classList.add("overlappingEvents");

          if(i.checked==true) newDiv.innerHTML =  `${i.title},<br> TIMING : ALL DAY <br>`;
          else newDiv.innerHTML =  `${i.title},<br> FROM : ${i.from} - TO : ${i.to}<br>`; 
                   
          overLap.appendChild(newDiv);
       }
    }
}
        html = `<button id="continue">CONTINUE</button>
        <button id="back">BACK</button> `;
        overLap.innerHTML +=html;

        GEI("back").addEventListener("click" , ()=>{
          overLap.style.display = "none";
          openEvent(date);
        }); 
        GEI("continue").addEventListener("click", ()=>{
          overLap.style.display =  "none";
          saveOnOverlap();
          openEvent(date);
          exec();
        });
        
}

function cancelWindow() {
  newEventDiv = false;
  eventTitleInput.classList.remove('error');
  newEvent.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  exec();
}

function checkOverlap(){
  let ret = false;
  for (const i of events) {    
    if(i.date===clicked){
      const timeString1 =   `${i.from}:${i.to}`;
      const timeArray1 = timeString1.split(":");
      const from1 = timeArray1[0]*60+1*timeArray1[1];
      const to1 = timeArray1[2]*60+1*timeArray1[3]; 

       if(i.checked===false && (from>from1 && from<to1 || to>to1 && to<from1 || from1>from && from1 < to || to1 > to && to1 < from || from==from1 || to==to1)){
        tempDate = clicked; 
        tempString = eventTitleInput.value;
        showOverlaps(i.date);
        ret = true;
        break;
        
      }
    }
  }
  return ret ? true : false ;

}


function saveEvent() {




  timeString =   `${fromTime.value}:${toTime.value}`;
  timeArray = timeString.split(":");
  from = timeArray[0]*60+1*timeArray[1];
  to = timeArray[2]*60+1*timeArray[3];
  
  if (eventTitleInput.value && ((from< to)||allDay.checked==true)) {
    
    eventTitleInput.classList.remove('error');
    
    let bol = checkOverlap();
    if(bol == false){
   
    events.push({
      date: clicked,
      title: eventTitleInput.value,
      from: fromTime.value,
      to:toTime.value,
      checked: allDay.checked,
    });
    }
    localStorage.setItem('events', JSON.stringify(events));
    cancelWindow();
  } else if(to<from){
    alert("ENTER VALID TIME");
  }else eventTitleInput.classList.add('error');
   
}

function closeEvent(){
  eventTitleInput.classList.remove('error');
  Alert.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  exec();
}

function addEvent(){
  Alert.style.display = "none";
  newEvent.style.display = "block";
}


function initButtons(){
  

  document.addEventListener('keydown', (key) => {
    if(key.keyCode == 39){
    change++;
    exec();
    // //(">>>>>>");
  }
  }, false);

  document.addEventListener('keydown', (key) => {
    if(key.keyCode == 37){
    change--;
    exec();
    // //("<<<<<<<");
  }
  }, false);

  document.addEventListener('keydown', (key) => {
    if(key.keyCode == 67){
    change=0;
    changeInYear = 0;
    exec();
   
  }
  }, false);

  

  GEI(`backButton`).addEventListener('click', () => {
    change--;
    exec();
  });
  GEI(`nextButton`).addEventListener('click', () => {
    change++;
    exec();
  });

  GEI("Today").addEventListener("click" , ()=>{
    change=0;
    changeInYear = 0;
    exec();
  });

  GEI("backToEvent").addEventListener("click", ()=>{
    Edit.style.display = 'none';
    Alert.style.display = "block";  
  });

  GEI("monthDisplay").addEventListener("click" , () =>{
    openYearView(year);
    
  });

  GEI("prevYear").addEventListener("click" , ()=>{
    year -=1;
    changeInYear = changeInYear - 1;
    openYearView(year);
  });

  GEI("nextYear").addEventListener("click" , ()=>{
    year +=1;
    changeInYear = changeInYear + 1;
    openYearView(year); 
  });

  GEI("currYear").addEventListener("click" , ()=>{
    exec();
  })
  
  GEI('saveButton').addEventListener('click', saveEvent);
  GEI('cancelButton').addEventListener('click', cancelWindow);
  GEI('closeButton').addEventListener('click', closeEvent);
  GEI('add').addEventListener('click', addEvent);
}

document.addEventListener('DOMContentLoaded', () =>{
  GEI('monthD').addEventListener('input',(ev) =>{
    let select = ev.target;
    value = select.value;
    let temp = value -month;
    change = change + temp;
  exec();
  });
});

document.addEventListener('DOMContentLoaded', () =>{
  GEI('yearD').addEventListener('input',(ev)=>{
    let selected = ev.target;
    values = selected.value;
    let temp  = values-year;
    changeInYear = changeInYear + temp; 
   exec();
  });
});

function checkBox(){
  if(allDay.checked==true){
  fromTime.value = "--:--";
  toTime.value ="--:--";
  GEI("from").disabled = true;
  GEI("to").disabled = true;
  }else{
  GEI("from").disabled = false;
  GEI("to").disabled = false;
  }
  if(newAllDay.checked==true){
    newFromTime.value = "--:--";
    newToTime.value ="--:--";
    GEI("newFrom").disabled = true;
    GEI("newTo").disabled = true;
    }else{
    GEI("newFrom").disabled = false;
    GEI("newTo").disabled = false;
    }
}

function openYearView(Year){
  GEI("currYear").innerHTML = Year;
  GEI("prevYear").innerHTML = Year-1;
  GEI("nextYear").innerHTML = Year+1;
  GEI("container").style.display = "none";
  GEI("yearViewContainer").style.display = "block";
  GEI("monthView").innerHTML = "";
  for(let i = 1;i<13;i++){
    let monthWindow  = document.createElement("div");
    monthWindow.setAttribute("id" , `month${i}`);
    monthWindow.classList.add("monthWindow");
    GEI("monthView").appendChild(monthWindow);
    renderDaysInMonth(i);

    GEI(`month${i}`).addEventListener("click" , ()=>{
      console.log(`clicked on month${i} and year ${year}`);
      let temp = (i-1) -month;
      change = change + temp;
      console.log(`change ${i} - ${month} -> ${change}`)
      exec();
    });

  }
  
}

function renderDaysInMonth(month){
   const dt = new Date();
  const dateY = dt.getDate();
  const monthY = month-1;
  const yearY = year;
  
  const NoOfDays = new Date(yearY , monthY + 1, 0).getDate();
  const firstDay = new Date(yearY , monthY , 1);
  const dayString = firstDay.toLocaleDateString(`en-us`,{ weekday : 'long' ,});
  const paddingDays = weekdays.indexOf(dayString);



  let monthDiv = GEI(`month${month}`);
  monthDiv.innerHTML = "";
  dt.setMonth(month-1);
  let text = (dt.toLocaleDateString('en-us', { month: 'long' }));
  let monthTitle = document.createElement('div');
  monthTitle.setAttribute('id' , 'monthTitle');
  monthTitle.innerHTML = text.toUpperCase();
  monthTitle.style.backgroundColor = "Grey";
  monthDiv.appendChild(monthTitle);

  for( let i=0 ; i<7 ; i++){
    const weekDay = document.createElement('div');
    weekDay.setAttribute("id" , 'smallWeekDay');
    weekDay.classList.add('smallWeekDay');
    weekDay.innerHTML = days[i];
    monthDiv.appendChild(weekDay);
  }

  for (let i = 1 ; i <=paddingDays+NoOfDays; i++){
       const daySquare = document.createElement('div');
       if(i%7==1){
        daySquare.setAttribute("id" , "smallWeekDate");
        daySquare.classList.add('smallWeekDate');
       }else{
        daySquare.setAttribute("id" , "smallDay");
        daySquare.classList.add('smallDay');
       }
       

    

       if(i > paddingDays){
          daySquare.innerText = i - paddingDays;
          
          // if (i - paddingDays === dateY && yearY==2022) daySquare.id = 'smallCurrentDay';
         
       }else{
          daySquare.classList.add('smallPadding');
       }
       monthDiv.appendChild(daySquare);
  }
}



initButtons(); exec();



