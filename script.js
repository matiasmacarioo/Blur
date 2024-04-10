document.addEventListener("DOMContentLoaded", function() {
    const imageInput = document.getElementById('imageInput');
    const imageContainer = document.getElementById('imageContainer');
    const blurRange = document.getElementById('blurRange');
    const compressionRange = document.getElementById('compressionRange');
    const saveButton = document.getElementById('saveButton');

    // Event listener for file input change
    imageInput.addEventListener('change', function() {
        imageContainer.innerHTML = ''; // Clear previous images
        const files = this.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = new Image();
                    img.src = e.target.result;
                    img.onload = function() {
                        const imgDiv = document.createElement('div');
                        imgDiv.classList.add('image-item');
                        imgDiv.appendChild(img);
                        imageContainer.appendChild(imgDiv);
                    };
                };
                reader.readAsDataURL(file);
            }
        }
    });

    // Event listener for blur range change
    blurRange.addEventListener('input', function() {
        applyBlur();
    });

    // Event listener for compression range change
    compressionRange.addEventListener('input', function() {
        applyBlur();
    });

    // Event listener for save button click
    saveButton.addEventListener('click', function() {
        const imgs = imageContainer.querySelectorAll('.image-item img');
        imgs.forEach((img, index) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const imgWidth = img.naturalWidth;
            const imgHeight = img.naturalHeight;
            canvas.width = imgWidth;
            canvas.height = imgHeight;
            ctx.filter = `blur(${blurRange.value}px)`;
            ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
            const dataUrl = canvas.toDataURL('image/jpeg', compressionRange.value);
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = `blurred_image_${index + 1}.jpg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    });

    function applyBlur() {
        const imgs = imageContainer.querySelectorAll('.image-item img');
        imgs.forEach(img => {
            img.style.filter = `blur(${blurRange.value}px)`;
        });
    }
});
