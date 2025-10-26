// harmless shim to avoid errors when some code loads /calendar.js
document.addEventListener('DOMContentLoaded', () => {
  
  const container = document.getElementById('calendar') 
                 || document.querySelector('.calendar'); 
  if (!container) return; 

  
});

(function () {
  try {
    
    const root = document.getElementById('calendar');
    if (!root) return;

    
  } catch (e) {
    
    console.debug('calendar shim caught:', e);
  }
})();
