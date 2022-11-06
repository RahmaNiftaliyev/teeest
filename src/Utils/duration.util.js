export function getDurationText(minutes) {
    let hours = parseInt(minutes / 60);
  
    let text = '';
    if (hours >= 1) {
        text = `${hours} saat `;
    }
  
    minutes = minutes - hours * 60;
    if (minutes > 0) {
        text += `${minutes} dəqiqə`;
    }
  
    if(minutes === 0 && hours === 0) {
        text += 'Yoxdur'
    }
  
    return text;
  }