document.addEventListener('DOMContentLoaded', function () {
  const fileUploads = document.querySelectorAll('.file-container--js');

  if (fileUploads.length) {
    fileUploads.forEach((element) => {
      const fileInput = element.querySelector('.file-upload');
      const fileNameElement = element.querySelector('.file-name');
      const fileInfo = element.querySelector('.file-info');
      const removeFileElement = element.querySelector('.remove-file');
      const fileLabel = element.querySelector('.file-label');

      fileInfo.style.display = 'none';
      removeFileElement.style.display = 'none';

      fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
          fileNameElement.textContent = file.name;
          fileInfo.style.display = 'inline-block';
          removeFileElement.style.display = 'inline-block';
          fileLabel.style.display = 'none';
        }
      });

      removeFileElement.addEventListener('click', () => {
        fileInput.value = '';
        fileNameElement.textContent = '';
        fileInfo.style.display = 'none';
        removeFileElement.style.display = 'none';
        fileLabel.style.display = 'inline-block';
      });
    });
  }
  (function () {
    const labels = ['ДФО', 'ПФО', 'СЗФО', 'СКФО', 'СФО', 'УФО', 'ЦФО', 'ЮФО'];

    const data = {
      labels: labels,
      datasets: [
        {
          label: '2022',
          data: [3256889, 3256889, 3256889, 3256889, 3562998, 3256889, 3256889, 3256889],
          backgroundColor: '#9c4dcc',
        },
        {
          label: '2023',
          data: [3256889, 3256889, 3256889, 3256889, 3256889, 3256889, 3256889, 3256889],
          backgroundColor: '#a866d6',
        },
        {
          label: '2024',
          data: [3256889, 3256889, 3256889, 3256889, 3256889, 3256889, 3256889, 3256889],
          backgroundColor: '#b87de0',
        },
      ],
    };

    // Плагин для подписей сверху и снизу
    const topBottomLabelsPlugin = {
      id: 'topBottomLabels',
      afterDatasetsDraw(chart) {
        const { ctx } = chart;
        chart.data.datasets.forEach((dataset, datasetIndex) => {
          const meta = chart.getDatasetMeta(datasetIndex);
          meta.data.forEach((bar, index) => {
            const value = dataset.data[index].toLocaleString('ru-RU');
            const label = dataset.label;

            // Верхняя подпись (значение)
            ctx.save();
            ctx.translate(bar.x + 3, bar.y);
            ctx.rotate(-Math.PI / 2);
            ctx.fillStyle = '#000';
            ctx.font = '300 12px sans-serif';
            // ctx.textAlign = 'дуае';
            ctx.textBaseline = 'middle';
            ctx.fillText(value, 5, 0);
            ctx.restore();

            // Нижняя подпись (год)
            ctx.save();
            ctx.translate(bar.x, bar.y + bar.height + 10);
            ctx.rotate(-Math.PI / 2);
            ctx.fillStyle = '#444';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, 0, 0);
            ctx.restore();
          });
        });
      },
    };

    const allValues = data.datasets.flatMap((ds) => ds.data);
    const minValue = Math.min(...allValues);

    // Вычислим отступ, например, 5% от минимального значения
    const bottomOffset = minValue * 0.05;

    const config = {
      type: 'bar',
      data: data,
      options: {
        responsive: false,
        animation: false,
        layout: {
          padding: {
            // top: 50,
            // bottom: 110,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.raw.toLocaleString('ru-RU');
                return `${context.dataset.label}: ${value} чел`;
              },
            },
          },
          // legend: false,
        },
        scales: {
          x: {
            stacked: false,
            // categoryPercentage: 0.8, // 1 = все пространство, меньше — уже группы
            // barPercentage: 1.6,
            ticks: {
              padding: 35, // ← отступ между осью и подписью
            },
          },
          y: {
            display: false, // ← отключает ось
            suggestedMin: 1000000, // опускает базу графика
            min: 0,
            stacked: false,
            grace: '50%',
            // suggestedMin: minValue - bottomOffset + 1000000,
            ticks: {
              callback: function (value) {
                return value.toLocaleString('ru-RU');
              },
            },
          },
        },
      },
      plugins: [topBottomLabelsPlugin],
    };

    new Chart(document.getElementById('myChart').getContext('2d'), config);
  })();

  // Возрастно-половая структура

  (function () {
    const labels = Array.from({ length: 103 }, (_, i) => i); // 0–102 года

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Мужчины',
          data: [
            52, 50, 49, 48, 47, 45, 44, 42, 40, 38, 37, 36, 35, 34, 33, 32, 31, 30, 30, 29, 29, 29,
            29, 28, 28, 27, 27, 26, 26, 25, 25, 25, 25, 24, 24, 24, 24, 24, 23, 23, 23, 23, 23, 23,
            22, 22, 22, 22, 22, 21, 21, 21, 20, 20, 20, 20, 20, 19, 19, 19, 19, 19, 18, 18, 18, 18,
            18, 17, 17, 17, 17, 16, 16, 16, 16, 15, 15, 15, 15, 14, 14, 14, 14, 13, 13, 13, 13, 12,
            12, 12, 12, 11, 11, 11, 11, 10, 10, 10, 10, 9, 9, 9, 8,
          ],
          borderColor: '#7e57c2',
          backgroundColor: '#7e57c2',
          fill: false,
          tension: 0.2,
          pointRadius: 0,
        },
        {
          label: 'Женщины',
          data: [
            40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 58, 58, 59,
            59, 59, 59, 60, 60, 60, 60, 61, 61, 61, 61, 62, 62, 62, 62, 63, 63, 63, 63, 63, 63, 64,
            64, 64, 64, 65, 65, 65, 65, 65, 65, 65, 65, 65, 66, 66, 66, 66, 66, 67, 67, 67, 67, 67,
            68, 68, 68, 68, 68, 69, 69, 69, 69, 70, 70, 70, 70, 71, 71, 71, 71, 72, 72, 72, 72, 73,
            73, 73, 73, 74, 74, 74, 74, 75, 75, 75, 75, 76, 76, 76, 77,
          ],
          borderColor: '#d4e157',
          backgroundColor: '#d4e157',
          fill: false,
          tension: 0.2,
          pointRadius: 0,
        },
      ],
    };

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          tooltip: {
            backgroundColor: '#000', // чёрный фон
            titleColor: '#fff',
            bodyColor: '#fff',
            callbacks: {
              title: (tooltipItems) => {
                // Название региона
                return 'Ханты-Мансийский округ';
              },
              label: (tooltipItem) => {
                // label = Мужчины / Женщины
                const sex = tooltipItem.dataset.label;
                // x = возраст
                const age = tooltipItem.label;
                // y = население
                const value = tooltipItem.formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                return `${sex} ${age} г.   ${value} чел`;
              },
            },
          },
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Возраст',
            },
          },
          y: {
            min: 0,
            max: 100,
            title: {
              display: true,
              text: 'Доля, %',
            },
          },
        },
      },
    };

    new Chart(document.getElementById('myChart1'), config);
  })();

  (function () {
    const ctx = document.getElementById('myChart2');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['ДФО', 'ПФО', 'СЗФО', 'СКФО', 'СФО', 'УФО', 'ЦФО', 'ЮФО'],
        datasets: [
          { label: '0-6', data: [8, 8, 8, 8, 8, 8, 8, 8], backgroundColor: '#CEDA5B' },
          { label: '7-13', data: [10, 10, 10, 10, 10, 10, 10, 10], backgroundColor: '#B4C32A' },
          { label: '14-17', data: [5, 0, 5, 5, 5, 5, 5, 5], backgroundColor: '#A99BC4' },
          { label: '18-24', data: [8, 5, 8, 8, 8, 5, 8, 8], backgroundColor: '#9985C0' },
          { label: '25-29', data: [5, 8, 0, 5, 5, 8, 0, 5], backgroundColor: '#8C68D0' },
          { label: '30-35', data: [9, 9, 9, 9, 9, 9, 9, 9], backgroundColor: '#7049B9' },
          { label: 'от 36', data: [55, 55, 55, 55, 55, 55, 55, 55], backgroundColor: '#4D3084' },
        ],
      },
      options: {
        indexAxis: 'y', // делает горизонтальную stacked bar
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: { enabled: true },
        },
        scales: {
          x: { stacked: true },
          y: { stacked: true },
        },
      },
    });
  })();
});
