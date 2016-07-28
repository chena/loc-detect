'use strict';

// some unique key to for local storage
var key = 'whereami';
// default to ca site
var currentPath = '#ca';

function redirect(target) {
  location.hash = target;
}

function checkAndRidirect() {
  // check if country is cached
  if (key in localStorage) {
    if (location.hash) {
      currentPath = location.hash;
    }

    var cachedCountry = localStorage.getItem(key);
    if (cachedCountry === 'us') {
      if (currentPath !== '#us') {
        redirect('#us');
      }
    } else { // everywhere else
      if (currentPath === '#us') {
        redirect('#ca');
      }
    }
  } else { // nothing cached
    $.getJSON('http://ipinfo.io', function(res) {
      var country = res.country.toLowerCase();
      alert('You are in ' + country);
      var target = country === 'us' ? '#us' : '#ca';
      redirect(target);
      localStorage.setItem(key, target.slice(1));
    });
  }
}

$(function() {
  $('#select_country').val(location.hash && location.hash.slice(1) || 'ca');
  $('#select_country').change(function() {
    var changedTo = $('#select_country').val() === 'us' ? 'us' : 'ca';
    localStorage.setItem(key, changedTo);
    redirect('#' + changedTo);
  });
});

checkAndRidirect();

