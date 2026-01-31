// Burger menu
(() => {
  const burger = document.getElementById('burgerBtn');
  const sidebar = document.getElementById('sidebar');
  document.getElementById('closeSidebar').onclick = () => sidebar.classList.remove('active');
  burger.onclick = () => sidebar.classList.add('active');
})();

// Slider
(() => {
  const slides = document.querySelector('.slides');
  const images = document.querySelectorAll('.slides img');
  const pagination = document.getElementById('pagination');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');

  let index = 0;

  slides.style.width = `${images.length * 100}%`;
  images.forEach(img => img.style.width = `${100 / images.length}%`);

  const update = () => {
    slides.style.transform = `translateX(-${index * (100 / images.length)}%)`;
    renderPagination();
  };

  const renderPagination = () => {
    pagination.innerHTML = '';
    images.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.textContent = '●';
      if (i === index) dot.classList.add('active');
      dot.onclick = () => { index = i; update(); };
      pagination.appendChild(dot);
    });
  };

  prev.onclick = () => { index = (index - 1 + images.length) % images.length; update(); };
  next.onclick = () => { index = (index + 1) % images.length; update(); };

  setInterval(() => { index = (index + 1) % images.length; update(); }, 5000);

  update();
})();

// Features
(() => {
  const features = [
    { icon:'🚚', title:'უფასო მიწოდება', desc:'მთელ საქართველოში' },
    { icon:'💳', title:'უსაფრთხო გადახდა', desc:'დაცული სისტემები' },
    { icon:'🔁', title:'დაბრუნება', desc:'30 დღის განმავლობაში' }
  ];
  const container = document.getElementById('features');
  features.forEach(f => {
    const div = document.createElement('div');
    div.className = 'feature';
    div.innerHTML = `<div>${f.icon}</div><h3>${f.title}</h3><p>${f.desc}</p>`;
    container.appendChild(div);
  });
})();

// Products + Modal
(() => {
  const container = document.getElementById('productsContainer');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const closeModal = document.getElementById('closeModal');

  fetch('https://warrior.ge/api/products')
    .then(r => r.json())
    .then(products => {
      products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
          <img src="${p.image}" />
          <h4>${p.name}</h4>
          <p>${p.discountedPrice ? `<del>${p.price}</del> ${p.discountedPrice}` : p.price}</p>
          <button class="view">დეტალურად</button>
        `;
        container.appendChild(div);

        div.querySelector('.view').onclick = () => {
          modal.style.display = 'block';
          modalImg.src = p.image;
          modalTitle.textContent = p.name;
          modalDesc.textContent = p.description;
        };
      });
    });

  closeModal.onclick = () => modal.style.display = 'none';
  window.onclick = e => { if(e.target === modal) modal.style.display = 'none'; };
})();

// Contact form
(() => {
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');

  form.onsubmit = e => {
    e.preventDefault();
    const name = form.name, email = form.email, phone = form.phone, text = form.message;
    [name,email,phone,text].forEach(i=>i.classList.remove('error'));

    if(name.value.length<3) return error(name,'სახელი მინ 3 სიმბოლო');
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) return error(email,'ელფოსტა არასწორია');
    if(!/^\d{9,}$/.test(phone.value)) return error(phone,'ტელეფონი არასწორია');
    if(!text.value) return error(text,'შეტყობინება ცარიელია');

    msg.textContent = 'ფორმა გაგზავნილია წარმატებით ✅';
    msg.style.color = 'green';
    form.reset();
  };

  const error = (el, text) => { el.classList.add('error'); msg.textContent=text; msg.style.color='red'; };
})();

// Dark/Light theme
(() => {
  const btn = document.getElementById('themeToggle');
  const body = document.body;
  body.className = localStorage.getItem('theme') || 'light';

  btn.onclick = () => {
    body.className = body.className==='light'?'dark':'light';
    localStorage.setItem('theme', body.className);
  };
})();