document.addEventListener('DOMContentLoaded', function() {
    const increaseFontBtn = document.getElementById('increase-font');
    const decreaseFontBtn = document.getElementById('decrease-font');
    const toggleContrastBtn = document.getElementById('toggle-contrast');

    increaseFontBtn.addEventListener('click', function() {
        document.body.classList.add('larger-font');
    });

    decreaseFontBtn.addEventListener('click', function() {
        document.body.classList.remove('larger-font');
    });

    toggleContrastBtn.addEventListener('click', function() {
        document.body.classList.toggle('high-contrast');
    });
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартную отправку формы

    const form = document.getElementById('contact-form');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    fetch('YOUR_CLOUD_FUNCTION_URL', { // Замените на URL вашей Cloud Function
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('form-result').textContent = data.result; // Выводим сообщение от сервера
        form.reset(); // Очищаем форму
    })
    .catch(error => {
        console.error('Ошибка:', error);
        document.getElementById('form-result').textContent = 'Произошла ошибка при отправке сообщения.';
    });
});



    /**
 * Обработчик HTTP-запросов для отправки email.
 *
 * @param {Object} req Объект запроса HTTP.
 * @param {Object} res Объект ответа HTTP.
 */
exports.sendEmail = async (req, res) => {
    // CORS
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'POST');
  
    if (req.method === 'OPTIONS') {
      // Send response to OPTIONS requests
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.status(204).send('');
    } else {
      try {
        const { name, email, message } = req.body;
  
        // Настройка Nodemailer
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
          service: 'gmail', // или другой почтовый сервис
          auth: {
            user: 'your-gmail@gmail.com', // Ваш email
            pass: 'your-gmail-password'   // Ваш пароль или App Password
          }
        });
  
        const mailOptions = {
          from: 'your-gmail@gmail.com',
          to: 'your-recipient@example.com', // Кому отправлять
          subject: 'Сообщение с сайта IntelligentPC',
          text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`
        };
  
        // Отправка письма
        await transporter.sendMail(mailOptions);
  
        res.status(200).json({ result: 'Спасибо! Ваше сообщение отправлено.' });
  
      } catch (error) {
        console.error('Ошибка отправки email:', error);
        res.status(500).json({ result: 'Произошла ошибка при отправке сообщения.' });
      }
    }
  };



  document.getElementById('configurator-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Здесь будет логика расчета стоимости и отображения результата
    const cpu = document.getElementById('cpu').value;
    const gpu = document.getElementById('gpu').value;
    const ram = document.getElementById('ram').value;
    const storage = document.getElementById('storage').value;

    //  Пример расчета (нужно адаптировать под вашу систему ценообразования)
    let totalPrice = 0;
    if (cpu === 'intel-i5') totalPrice += 20000;
    if (cpu === 'intel-i7') totalPrice += 30000;
    if (cpu === 'amd-ryzen5') totalPrice += 18000;
    if (cpu === 'amd-ryzen7') totalPrice += 28000;

    if (gpu === 'rtx-3060') totalPrice += 35000;
    if (gpu === 'rtx-3070') totalPrice += 50000;
    if (gpu === 'rx-6700xt') totalPrice += 40000;
    if (gpu === 'rx-6800xt') totalPrice += 55000;

    if (ram === '16gb') totalPrice += 8000;
    if (ram === '32gb') totalPrice += 15000;
    if (ram === '64gb') totalPrice += 25000;

    if (storage === '500gb-ssd') totalPrice += 5000;
    if (storage === '1tb-ssd') totalPrice += 10000;
    if (storage === '2tb-ssd') totalPrice += 18000;

    document.getElementById('configurator-result').textContent = `Примерная стоимость: ${totalPrice} руб.`;
});