export function getCurrentYear(){
    let newDate = new Date()
    let year = newDate.getFullYear();   
    return `${year}`
}

export function getCurrentMonth(){
    let newDate = new Date()
    let month = newDate.getMonth() + 1;
    return `${month}`
}

export function getCurrentDay(){
    let newDate = new Date()
    let day = newDate.getDate();
    return `${day}`
}

export function getDeliveryDate(selectedCountry){
    let month = Number(getCurrentMonth());
    let day =Number(getCurrentDay());
    //add one month
    if(selectedCountry === "israel" || selectedCountry === "usa"){
        if(month === 12){
            month = 1;
          }
          else{
            month = month+1;
          }
    }
    //add two month
    if(selectedCountry === "russia" || selectedCountry === "china" || selectedCountry === "india"){
        if(month === 12){
            month = 2;
          }
          else if(month === 11){
            month = 1;
          }
          else{
            month = month+2;
          }
        //remove one day
        if(day<30){
            day--;
        }
    }
    //month to letters
    if(month === 1){
        month = "Jan";
    }
    else if(month === 2){
        month = "Feb";
    }
    else if(month === 3){
        month = "Mar";
    }
    else if(month === 4){
        month = "Apr";
    }
    else if(month === 5){
        month = "May";
    }
    else if(month === 6){
        month = "Jun";
    }
    else if(month === 7){
        month = "Jul";
    }
    else if(month === 8){
        month = "Aug";
    }
    else if(month === 9){
        month = "Sep";
    }
    else if(month === 10){
        month = "Oct";
    }
    else if(month === 11){
        month = "Nov";
    }
    else if(month === 12){
        month = "Dec";
    }
    let deliveryDate = month+" "+day;
    return deliveryDate;
}

export function getCurrentDate(){
    const blankCountry = "";
    let curDate = getDeliveryDate(blankCountry);
    curDate = curDate+", "+getCurrentYear();
    return curDate;
}

export function getDeliveryDateAndYear(selectedCountry){
    const curMonth = getCurrentMonth();
    let deliveryYear = getCurrentYear();
    if(((selectedCountry === "israel" || selectedCountry === "usa")&&(curMonth === "12"))||
    ((selectedCountry === "russia" || selectedCountry === "china" || selectedCountry === "india")&&(Number(curMonth)>=11))){
        deliveryYear = Number(deliveryYear)+1;
    }
    let deliveryDate = getDeliveryDate(selectedCountry);
    deliveryDate = deliveryDate+", "+deliveryYear;
    return deliveryDate;
}