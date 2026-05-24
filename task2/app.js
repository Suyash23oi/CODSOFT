/* 
 * TRANSFORMERS FITNESS HEALTH CLUB
 * Dynamic Front-End Interactions & Calculations
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Sticky Header Scroll Hook
  // ==========================================
  const header = document.querySelector('.header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check on load


  // ==========================================
  // 2. Real-Time Gym Opening Status Evaluator
  // ==========================================
  const statusBadge = document.getElementById('gym-status-badge');
  const statusText = document.getElementById('gym-status-text');

  const checkGymStatus = () => {
    const now = new Date();
    const day = now.getDay(); // 0: Sunday, 1: Mon, ..., 6: Sat
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hour * 60 + minutes;

    let isOpen = false;
    let closingTimeText = '';
    let nextOpeningText = '';

    if (day === 0) {
      // Sunday: 7:00 AM to 11:00 AM (420 to 660 mins)
      if (totalMinutes >= 420 && totalMinutes < 660) {
        isOpen = true;
        closingTimeText = '11:00 AM';
      } else {
        nextOpeningText = 'Monday at 6:00 AM';
      }
    } else {
      // Monday - Saturday: 6:00 AM to 10:00 PM (360 to 1320 mins)
      if (totalMinutes >= 360 && totalMinutes < 1320) {
        isOpen = true;
        closingTimeText = '10:00 PM';
      } else {
        if (day === 6) {
          nextOpeningText = 'Sunday at 7:00 AM';
        } else {
          nextOpeningText = 'Tomorrow at 6:00 AM';
        }
      }
    }

    if (isOpen) {
      statusBadge.className = 'gym-status-badge open';
      statusText.innerHTML = `Open Now • Closes at ${closingTimeText}`;
    } else {
      statusBadge.className = 'gym-status-badge';
      statusText.innerHTML = `Closed • Opens ${nextOpeningText}`;
    }
  };

  checkGymStatus();
  setInterval(checkGymStatus, 60000); // Check status every minute


  // ==========================================
  // 3. Interactive Membership Savings Calculator
  // ==========================================
  const calcSlider = document.getElementById('calc-slider');
  const calcDuration = document.getElementById('calc-duration');
  const calcBasePrice = document.getElementById('calc-base-price');
  const calcOfferPrice = document.getElementById('calc-offer-price');
  const calcSavings = document.getElementById('calc-savings');
  const calcBonus = document.getElementById('calc-bonus');

  // Hard values from Handwritten notes (with updated 1m and 3m offers)
  const pricingSteps = [
    {
      months: 1,
      totalMonths: 1,
      base: 2500,
      offer: 2000,
      savings: 500,
      bonus: "Standard Access"
    },
    {
      months: 3,
      totalMonths: 4,
      base: 5500,
      offer: 4500,
      savings: 1000,
      bonus: "1 Month FREE Added!"
    },
    {
      months: 6,
      totalMonths: 7,
      base: 7500,
      offer: 6000,
      savings: 1500,
      bonus: "1 Month FREE Added!"
    },
    {
      months: 12,
      totalMonths: 13,
      base: 9500,
      offer: 7500,
      savings: 2000,
      bonus: "1 Month FREE Added!"
    }
  ];

  calcSlider.addEventListener('input', (e) => {
    const idx = parseInt(e.target.value);
    const data = pricingSteps[idx];

    if (data) {
      calcDuration.textContent = `${data.totalMonths} Month${data.totalMonths > 1 ? 's' : ''} Membership`;
      calcBasePrice.textContent = `₹${data.base.toLocaleString('en-IN')}`;
      calcOfferPrice.textContent = `₹${data.offer.toLocaleString('en-IN')}`;
      calcSavings.textContent = `₹${data.savings.toLocaleString('en-IN')}`;
      calcBonus.textContent = data.bonus;

      // Add a quick visual bounce to savings
      calcSavings.style.transform = 'scale(1.1)';
      calcSavings.style.transition = 'transform 0.15s ease';
      setTimeout(() => {
        calcSavings.style.transform = 'scale(1)';
      }, 150);
    }
  });


  // ==========================================
  // 4. Gym Inquiry Form Submission Controller
  // ==========================================
  const inquiryForm = document.getElementById('gym-inquiry-form');
  const inquiryInputs = inquiryForm.querySelectorAll('.form-input-node');
  const inquirySubmitBtn = inquiryForm.querySelector('.newsletter-submit');
  const inquiryFeedback = document.getElementById('inquiry-success-feedback');

  inquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('inquiry-name').value.trim();
    const phone = document.getElementById('inquiry-phone').value.trim();

    if (name && phone) {
      // Successful registration action
      inquiryFeedback.textContent = `Thank you, ${name}! Your inquiry has been logged. Our trainers will call you shortly on +91 ${phone}.`;
      inquiryFeedback.classList.add('visible');

      // Clear fields and disable inputs
      inquiryInputs.forEach(input => {
        input.value = '';
        input.style.opacity = 0.5;
        input.disabled = true;
      });
      inquirySubmitBtn.disabled = true;
      inquirySubmitBtn.style.opacity = 0.5;

      // Reset form after 8 seconds
      setTimeout(() => {
        inquiryFeedback.classList.remove('visible');
        inquiryInputs.forEach(input => {
          input.style.opacity = 1;
          input.disabled = false;
        });
        inquirySubmitBtn.disabled = false;
        inquirySubmitBtn.style.opacity = 1;
      }, 8000);
    }
  });

});
