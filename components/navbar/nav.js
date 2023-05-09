const hamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('.navigation');

document.addEventListener('click', function(event) {
  const isClickInside = navigation.contains(event.target) || hamburger.contains(event.target);
  if (!isClickInside) {
    navigation.classList.remove('active');
    hamburger.classList.remove('hidden');
  }
});

hamburger.addEventListener('click', function() {
  navigation.classList.add('active');
  hamburger.classList.add('hidden');
});