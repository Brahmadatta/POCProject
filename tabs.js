let currentTab = 0;
    const tabs = document.querySelectorAll('.tab');
    const tabHeaders = document.querySelectorAll('.tab-header');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function showTab(index) {
      tabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
        tabHeaders[i].classList.toggle('active', i === index);
      });
      currentTab = index;
      updateButtons();
    }

    function goToTab(index) {
      showTab(index);
    }

    function updateButtons() {
      prevBtn.style.display = currentTab === 0 ? 'none' : 'inline-block';
      nextBtn.textContent = currentTab === tabs.length - 1 ? 'Submit' : 'Next';
    }

    function prevTab() {
      if (currentTab > 0) {
        showTab(currentTab - 1);
      }
    }

    function nextOrSubmit() {
      if (currentTab === 0) {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const ageValue = document.getElementById('age').value.trim();
        const age = Number(ageValue);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name) return alert("Please enter your name.");
        if (!email || !emailPattern.test(email)) return alert("Please enter a valid email address.");
        if (!ageValue || isNaN(age) || age < 0) return alert("Please enter a valid, non-negative age.");

        showTab(currentTab + 1);
      } else if (currentTab === 1) {
        const selected = document.querySelectorAll('.interest:checked');
        if (selected.length === 0) return alert("Please select at least one interest.");
        showTab(currentTab + 1);
      } else if (currentTab < tabs.length - 1) {
        showTab(currentTab + 1);
      } else {
        const profile = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          age: document.getElementById('age').value
        };

        const interests = [];
        document.querySelectorAll('.interest:checked').forEach(cb => interests.push(cb.value));

        const theme = document.querySelector('input[name="theme"]:checked')?.value || 'None';

        const formData = { profile, interests, theme };
        console.log('Submitted Data:', formData);
        alert('Form submitted! Check console.');
      }
    }

    // Theme switcher
    document.addEventListener('change', (e) => {
      if (e.target.name === 'theme') {
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(e.target.value.toLowerCase() + '-theme');
      }
    });

    // Initialize
    document.body.classList.add('light-theme');
    showTab(0);