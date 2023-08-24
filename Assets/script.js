function printProjectData() {
  projectDisplayEl.empty();

  var projects = readProjectsFromStorage();

for (let i = 9; i <= 17; i++) {
  var projects = projects[i];
  const timeBlockId = `hour-${i}`;
  const savedInput = localStorage.getItem(timeBlockId);
  console.log(`Retrieved data for ${timeBlockId}: ${savedInput}`);
 }
}

$(document).ready(function () {
const currentDateElement = $('#currentDay');
const saveButtons = $('.saveBtn');

saveButtons.on('click', function() {
    const timeBlock = $(this).closest('.time-block');
    const timeBlockId = timeBlock.attr('id');
    const description = timeBlock.find('.description').val();

    console.log(`Saving data for ${timeBlockId}: ${description}`);

    localStorage.setItem(timeBlockId, description);
  });

  updateDate();
  setInterval(updateDate, 1000);

  function updateDate() {
    const currentDay = dayjs().format('D');
    const dayWithSuffix = addDaySuffix(currentDay);
    const currentFormattedDate = dayjs().format('dddd, MMMM') + ' ' + dayWithSuffix;

    currentDateElement.text(currentFormattedDate);
  }

   function addDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return day + 'th';
    }
    switch (day % 10) {
      case 1:
        return day + 'st';
      case 2:
        return day + 'nd';
      case 3:
        return day + 'rd'
      default:
        return day + 'th';
    }
   } 

  //Display of the current date in the header of the page.
   const currentHour = dayjs().hour();

   for (let i = 9; i <= 17; i++) {
     const timeBlock = $(`#hour-${i}`);
     const textarea = timeBlock.find('textarea');

     timeBlock.removeClass('past present future');
 
     if (i < currentHour) {
       timeBlock.addClass('past');
     } else if (i === currentHour) {
       timeBlock.addClass('present');
     } else {
       timeBlock.addClass('future');
     }

     const savedInput = localStorage.getItem(`hour-${i}`);
     if (savedInput) {
      textarea.val(savedInput);
     }
   }
  });

