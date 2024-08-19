/**
* Template Name: FlexStart
* Template URL: https://bootstrapmade.com/flexstart-bootstrap-startup-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

document.addEventListener('DOMContentLoaded', function() {
  const submitButton = document.getElementById('submitButton'); // Ensure this ID matches your button
  const responseMessage = document.getElementById('responseMessage');
  let messageTimeout;

  document.getElementById('contactForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission

      submitButton.disabled = true; // Disable the submit button

      const formData = new FormData(this);

      fetch('https://script.google.com/macros/s/AKfycbwi9E95MOAzZuRm-vRZhG4bLIrii9DPAGuOs8QipuBkNY9HnAArOx-z2wQ6Krdp--3F/exec', { // Replace with your script URL
          method: 'POST',
          body: formData
      })
      .then(response => response.text())
      .then(result => {
          responseMessage.innerText = 'Your Message has been sent successfully!';
          responseMessage.style.color = 'green';

          // Clear the form after successful submission
          document.getElementById('contactForm').reset();
      })
      .catch(error => {
          responseMessage.innerText = 'An error occurred. Please try again.';
          responseMessage.style.color = 'red';
      })
      .finally(() => {
          submitButton.disabled = false; // Re-enable the submit button

          // Clear any existing timeout
          if (messageTimeout) {
              clearTimeout(messageTimeout);
          }

          // Set a new timeout to clear the message after 5 seconds (5000 ms)
          messageTimeout = setTimeout(() => {
              responseMessage.innerText = '';
          }, 5000); // Change the time as needed
      });
  });
});

function updateYearInSpan() {
  const currentYear = new Date().getFullYear();
  document.getElementById('spanYear').textContent = currentYear;
}
document.addEventListener('DOMContentLoaded', (event) => {
  updateYearInSpan();
});

function validateForm() {
  var form = document.getElementById('contactForm');
  var inputs = form.querySelectorAll('input, textarea');
  var isValid = true;
  
  inputs.forEach(function(input) {
      if (!input.checkValidity()) {
          input.classList.add('is-invalid');
          isValid = false;
      } else {
          input.classList.remove('is-invalid');
      }
  });

  return isValid;
}


// JavaScript to dynamically update the "Last Updated" date
window.onload = function() {
  var dateElement = document.getElementById("lastUpdatedDate");
  var currentDate = new Date();
  
  // Define a function to get the ordinal suffix for a given day
  function getOrdinalSuffix(day) {
      if (day > 3 && day < 21) return 'th'; // Catch-all for 4-20
      switch (day % 10) {
          case 1: return 'st';
          case 2: return 'nd';
          case 3: return 'rd';
          default: return 'th';
      }
  }
  
  // Extract day, month, and year
  var day = currentDate.getDate();
  var month = currentDate.toLocaleString('en-US', { month: 'long' });
  var year = currentDate.getFullYear();
  
  // Format the date with the ordinal suffix
  var formattedDate = day + getOrdinalSuffix(day) + ' ' + month + ', ' + year;
  
  // Update the text content of the date element
  dateElement.textContent = formattedDate;
}
