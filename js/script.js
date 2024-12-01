document.addEventListener("DOMContentLoaded", () => {
    // ====== CHATBOT ======
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbot = document.getElementById("chatbot");
    const chatbotClose = document.getElementById("chatbot-close");
    const chatbotSend = document.getElementById("chatbot-send");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const whatsappNumber = "+5511967217371"; 

    const chatbotMessagesContent = [
        "Olá! Bem-vindo à Concessionária.",
        "Como posso ajudar você hoje?",
        "Digite '1' para dúvidas sobre carros.",
        "Digite '2' para falar sobre serviços.",
        "Digite '3' para suporte geral.",
    ];

    let currentChatMessageIndex = 0;

    const showChatMessage = (message, sender = "bot") => {
        const div = document.createElement("div");
        div.classList.add("message", sender);
        div.textContent = message;
        chatbotMessages.appendChild(div);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };

    const showNextChatMessage = () => {
        if (currentChatMessageIndex < chatbotMessagesContent.length) {
            showChatMessage(chatbotMessagesContent[currentChatMessageIndex]);
            currentChatMessageIndex++;
        }
    };

    showNextChatMessage();
    showNextChatMessage();

    chatbotSend.addEventListener("click", () => {
        const userInput = chatbotInput.value.trim();
        if (userInput === "") return;

        showChatMessage(userInput, "user");

        if (userInput === "1") {
            showChatMessage("Acesse nossos modelos de carros em 'Destaques do Mês'.");
        } else if (userInput === "2") {
            showChatMessage("Nossos serviços incluem financiamento, seguros e manutenção.");
        } else if (userInput === "3") {
            showChatMessage("Redirecionando você para o WhatsApp...");
            setTimeout(() => {
                window.open(`https://wa.me/${whatsappNumber}`, "_blank");
            }, 2000);
        } else {
            showChatMessage("Estamos trabalhando para entender sua mensagem, por favor utilize alguns destes comandos: Digite '1' para dúvidas sobre carros; Digite 2 para falar sobre serviços; Digite 3 para suporte geral.");
        }

        chatbotInput.value = "";
    });

    chatbotToggle.addEventListener("click", () => {
        chatbot.style.display = chatbot.style.display === "block" ? "none" : "block";
    });

    chatbotClose.addEventListener("click", () => {
        chatbot.style.display = "none";
    });

    // ====== CARROSSEL ======
    const carousels = document.querySelectorAll(".carousel");

    carousels.forEach((carousel) => {
        const track = carousel.querySelector(".carousel-track");
        const items = Array.from(track.children);
        const nextButton = carousel.querySelector(".carousel-btn.next");
        const prevButton = carousel.querySelector(".carousel-btn.prev");

        let currentIndex = 0;

        const updateCarouselPosition = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        const autoRotateCarousel = () => {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarouselPosition();
        };

        let autoRotateInterval = setInterval(autoRotateCarousel, 5000);

        nextButton.addEventListener("click", () => {
            clearInterval(autoRotateInterval);
            currentIndex = (currentIndex + 1) % items.length;
            updateCarouselPosition();
            autoRotateInterval = setInterval(autoRotateCarousel, 5000);
        });

        prevButton.addEventListener("click", () => {
            clearInterval(autoRotateInterval);
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarouselPosition();
            autoRotateInterval = setInterval(autoRotateCarousel, 5000);
        });
    });

    // ====== FORMULÁRIO DE AGENDAMENTO ======
    const agendamentoForm = document.getElementById("agendamento-form");

    agendamentoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;
        const veiculo = document.getElementById("veiculo").value;
        const data = document.getElementById("data").value;
        const horario = document.getElementById("horario").value;
        const observacoes = document.getElementById("observacoes").value;

        alert(`
            Agendamento realizado com sucesso!
            Nome: ${nome}
            Email: ${email}
            Telefone: ${telefone}
            Veículo: ${veiculo}
            Data: ${data}
            Horário: ${horario}
            Observações: ${observacoes || "Nenhuma"}
        `);

        agendamentoForm.reset();
    });
});
