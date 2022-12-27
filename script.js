

    //create map
    var arrmap = new Map();
    //create date
    let date = new Date().toJSON().slice(0,10);
    //create default map
  
    function defaultmap(){
      arrmap.set("Hit the gym", "inprogress");
      arrmap.set("Pay bills", "completed");
      arrmap.set("Meet George", "inprogress");
      arrmap.set("Buy eggs", "inprogress");
      arrmap.set("Read a book", "inprogress");
      arrmap.set("Organize office", "inprogress");
      document.getElementById("myUL").innerHTML="";
      arrmap.forEach((values,keys)=>{
        newElementdate(keys,values);
      })
    }

    function clearLocalStorage()
    {
      localStorage.clear();
    }
    //element for date dropdown list
    var select = document.getElementById("select");

    //print the json present in the "localtodo" local storage
    console.log(localStorage.getItem("localtodo"));

    //create empty list
    elmts=[];
      const obj = JSON.parse(localStorage.getItem("localtodo"));
      if(obj!=null)
      arr = new Map(Object.entries(obj));
      else
      arr = new Map();

      //Extract the available dates from local storage Json
      
      let c=0;
      arr.forEach((values,keys)=>{
        elmts[c++]=keys;
      })
     // if json has no date available then use todays date only 
      if(c==0)
      {
      elmts[0]=date;
      defaultmap();
      }
     

      //populate the options into the dropdown and show in dom

    for (var i = 0; i < elmts.length; i++) {
      var optn = elmts[i];
      var el = document.createElement("option");
      el.textContent = optn;
      el.value = optn;
      select.appendChild(el);
  }
  if(c!=0)
  {
    getdata();
  }
  
  // Create a "close" button and append it to each list item

    // var myNodelist = document.getElementsByTagName("LI");
    // var i;
    // for (i = 0; i < myNodelist.length; i++) {
    //   var span = document.createElement("SPAN");
    //   var txt = document.createTextNode("\u00D7");
    //   span.className = "close";
    //   span.appendChild(txt);
    //   myNodelist[i].appendChild(span);
    // }

    // Click on a close button to hide the current list item

    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        var div = this.parentElement;
        var ans = div.textContent.slice(0, -1).trim();
        div.style.display = "none";
        arrmap.delete(ans);
      }
    }
    
    // Add a "checked" symbol when clicking on a list item

    var list = document.getElementById("myUL");
    list.addEventListener('click', function (ev) {
      if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        if (arrmap.get(ev.target.textContent.slice(0, -1)) === "inprogress")
        arrmap.set(ev.target.textContent.slice(0, -1), "completed");   
        else
          arrmap.set(ev.target.textContent.slice(0, -1), "inprogress");
         
      }
    }, false);
   
    //writetoJsonandstore in local storage
    function writeCSV() {
      var myStr = ""
    // myStr+=`{"${select.value}":{`;
    // for(let key of arrmap.keys()){
    //   myStr += "\""+key+"\":\""+arrmap.get(key)+"\",\r\n";
    // }
    const jsonFromMap = JSON.stringify(Object.fromEntries(arrmap));
    myStr+=`{"${select.value}":${jsonFromMap}}`;
    //myStr=myStr.slice(0,-3);
    //myStr+="\r\n}\r\n}";

    // check whether already a date is available , so we can correct the format and add the new one

    var prev = localStorage.getItem("localtodo");
    if(prev!="" && prev!=null)
    {
      prev=prev.slice(0,-1);
      prev+=","+myStr.slice(1);
      localStorage.setItem("localtodo",prev);
      console.log(prev);
    }
    else
    {
      localStorage.setItem("localtodo",myStr);
      console.log(myStr);

    }
    }

    //Get data from the json local storage
    function getdata()
    {
      localStorage.getItem("localtodo");
      const obj = JSON.parse(localStorage.getItem("localtodo"));
      if(obj!=null)
      arr = new Map(Object.entries(obj));
      else
      return;
      //console.log(arr.get(select.value));
      arrmap = new Map(Object.entries(arr.get(select.value)));
      document.getElementById("myUL").innerHTML="";
      arrmap.forEach((values,keys)=>{
        newElementdate(keys,values);
      })
    }//

    //create a new list item when clicking on the different date
    function newElementdate(elkey,elvalue) {
      var li = document.createElement("li");
      var t = document.createTextNode(elkey);
      li.appendChild(t);
      if(elvalue=="completed")
      li.classList.toggle('checked');
      document.getElementById("myUL").appendChild(li);
    
      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      li.appendChild(span);

      for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
          var div = this.parentElement;
          var ans = div.textContent.slice(0, -1).trim();
          div.style.display = "none";
          arrmap.delete(ans);
        }
      }
      
    }

    // Create a new list item when clicking on the "Add" button

    function newElement() {
      var li = document.createElement("li");
      var inputValue = document.getElementById("myInput").value;
      var t = document.createTextNode(inputValue);
      li.appendChild(t);
      if (inputValue === '') {
        alert("You must write something!");
      } else {
        document.getElementById("myUL").appendChild(li);
        arrmap.set(document.getElementById("myInput").value, "inprogress");
      }
      document.getElementById("myInput").value = "";

      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      li.appendChild(span);

      for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
          var div = this.parentElement;
          var ans = div.textContent.slice(0, -1).trim();
          div.style.display = "none";
          arrmap.delete(ans);
        }
      }
    }
