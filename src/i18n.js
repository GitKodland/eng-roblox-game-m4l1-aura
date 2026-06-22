export const SUPPORTED = ["en", "tr", "it", "es", "pt", "ar", "ru", "pl", "id"];
const LANGUAGE_KEY = "aura-lab-language";

export const translations = {
    en: {
        tabs: ["Aura", "Hero", "World", "Magic"],
        headings: ["Quick start", "Choose an aura", "Character", "Build your hero", "Environment", "Choose an arena", "Ability", "Cast magic"],
        labels: ["Aura variant", "Color", "Density", "Speed", "Radius", "Particle size", "Particle shape", "Movement", "Behavior", "Outfit", "Headwear", "Weapon", "Pose", "Companion", "Camera distance", "Brightness", "Hero phrase"],
        buttons: ["Mutation", "Random hero", "Reset camera", "CAST MAGIC", "Full random", "Reset all", "MAGIC", "Save", "Photo"],
        misc: ["Advanced settings", "You can cast again after half a second.", "Settings are saved locally", "Energy rating", "rotation", "zoom"],
        auraTypes: ["Orbital flow", "Energy rings", "Thunder storm", "Celestial halo"],
        shapes: ["Roblox blocks", "Light spheres", "Flames", "Stardust"],
        directions: ["Up", "Down", "Inward"],
        behaviors: ["Flow", "Pulse", "Chaos"],
        outfits: ["Mage", "Roblox Noob", "Void Knight", "Neon Demon", "Cyber Raider", "Golden King", "Shadow Ninja", "Street Hero"],
        hats: ["No headwear", "Wizard hat", "Demon horns"],
        weapons: ["Empty hands", "Magic staff", "Light sword", "Knight sword"],
        poses: ["Magic stance", "Levitation", "Combat ready", "Hero pose", "Ninja", "Victory", "Meditation", "Breakdance"],
        pets: ["No pet", "Cube spirit", "Energy wisp"],
        biomes: [["Abyss", "Cold space"], ["Matrix", "Neon grid"], ["Darkness", "Nothing extra"]],
        magic: ["Pulse", "Lightning", "Portal", "Meteor"],
        messages: {
            saving: "Saving…", saved: "Saved locally", heroReady: "New hero is ready",
            comboReady: "New combination is ready", mutated: "Aura mutated 🧬", auraSaved: "Aura saved",
            photoSaved: "Snapshot saved", reset: "Settings reset", spell: "AURA POWER — AWAKEN!"
        },
        ranks: ["COMMON AURA", "RARE AURA", "EPIC AURA", "LEGENDARY AURA", "MYTHIC AURA"],
        placeholder: "Aura power — awaken!"
    },
    ru: {
        tabs: ["Аура", "Герой", "Мир", "Магия"],
        headings: ["Быстрый старт", "Выбери ауру", "Персонаж", "Собери героя", "Окружение", "Выбери арену", "Способность", "Запусти магию"],
        labels: ["Вариант ауры", "Цвет", "Плотность", "Скорость", "Радиус", "Размер частиц", "Форма частиц", "Движение", "Поведение", "Костюм", "Головной убор", "Оружие", "Поза", "Спутник", "Дистанция камеры", "Яркость", "Фраза героя"],
        buttons: ["Мутация", "Случайный герой", "Сбросить камеру", "ЗАПУСТИТЬ МАГИЮ", "Полный рандом", "Сбросить всё", "МАГИЯ", "Сохранить", "Фото"],
        misc: ["Дополнительные настройки", "Можно запускать снова уже через полсекунды.", "Настройки сохраняются локально", "Рейтинг энергии", "вращение", "масштаб"],
        auraTypes: ["Орбитальный поток", "Энергокольца", "Грозовой шторм", "Небесное гало"],
        shapes: ["Roblox-блоки", "Сферы света", "Языки пламени", "Звёздная пыль"],
        directions: ["Вверх", "Вниз", "Внутрь"],
        behaviors: ["Поток", "Пульсация", "Хаос"],
        outfits: ["Маг", "Roblox Noob", "Рыцарь Бездны", "Неоновый демон", "Кибер-рейдер", "Золотой король", "Теневой ниндзя", "Уличный герой"],
        hats: ["Без головного убора", "Колпак волшебника", "Демонические рога"],
        weapons: ["Пустые руки", "Магический посох", "Световой меч", "Рыцарский меч"],
        poses: ["Магическая стойка", "Левитация", "Боевая готовность", "Поза героя", "Ниндзя", "Победа", "Медитация", "Брейк-данс"],
        pets: ["Без питомца", "Кубический дух", "Энергетический сгусток"],
        biomes: [["Бездна", "Холодный космос"], ["Матрица", "Неоновая сеть"], ["Тьма", "Ничего лишнего"]],
        magic: ["Импульс", "Молния", "Портал", "Метеор"],
        messages: {
            saving: "Сохраняю…", saved: "Сохранено локально", heroReady: "Новый герой готов",
            comboReady: "Новая комбинация готова", mutated: "Аура мутировала 🧬", auraSaved: "Аура сохранена",
            photoSaved: "Снимок сохранён", reset: "Настройки сброшены", spell: "СИЛА АУРЫ — ПРОБУДИСЬ!"
        },
        ranks: ["ОБЫЧНАЯ АУРА", "РЕДКАЯ АУРА", "ЭПИЧЕСКАЯ АУРА", "ЛЕГЕНДАРНАЯ АУРА", "МИФИЧЕСКАЯ АУРА"],
        placeholder: "Сила ауры — пробудись!"
    },
    tr: {
        tabs: ["Aura", "Kahraman", "Dünya", "Büyü"],
        headings: ["Hızlı başlangıç", "Aura seç", "Karakter", "Kahramanını oluştur", "Ortam", "Arena seç", "Yetenek", "Büyü yap"],
        labels: ["Aura türü", "Renk", "Yoğunluk", "Hız", "Yarıçap", "Parçacık boyutu", "Parçacık şekli", "Hareket", "Davranış", "Kıyafet", "Başlık", "Silah", "Poz", "Yoldaş", "Kamera mesafesi", "Parlaklık", "Kahraman sözü"],
        buttons: ["Mutasyon", "Rastgele kahraman", "Kamerayı sıfırla", "BÜYÜYÜ YAP", "Tam rastgele", "Tümünü sıfırla", "BÜYÜ", "Kaydet", "Fotoğraf"],
        misc: ["Gelişmiş ayarlar", "Yarım saniye sonra tekrar yapabilirsin.", "Ayarlar yerel olarak kaydedilir", "Enerji puanı", "döndür", "yakınlaştır"],
        auraTypes: ["Yörünge akışı", "Enerji halkaları", "Yıldırım fırtınası", "Göksel hale"],
        shapes: ["Roblox blokları", "Işık küreleri", "Alevler", "Yıldız tozu"],
        directions: ["Yukarı", "Aşağı", "İçeri"],
        behaviors: ["Akış", "Nabız", "Kaos"],
        outfits: ["Büyücü", "Roblox Noob", "Boşluk Şövalyesi", "Neon İblis", "Siber Akıncı", "Altın Kral", "Gölge Ninja", "Sokak Kahramanı"],
        hats: ["Başlık yok", "Büyücü şapkası", "İblis boynuzları"],
        weapons: ["Boş eller", "Sihirli asa", "Işık kılıcı", "Şövalye kılıcı"],
        poses: ["Büyü duruşu", "Havalanma", "Savaşa hazır", "Kahraman pozu", "Ninja", "Zafer", "Meditasyon", "Breakdance"],
        pets: ["Evcil hayvan yok", "Küp ruhu", "Enerji küresi"],
        biomes: [["Uçurum", "Soğuk uzay"], ["Matris", "Neon ağ"], ["Karanlık", "Fazlalık yok"]],
        magic: ["Darbe", "Yıldırım", "Portal", "Meteor"],
        messages: { saving: "Kaydediliyor…", saved: "Yerel olarak kaydedildi", heroReady: "Yeni kahraman hazır", comboReady: "Yeni kombinasyon hazır", mutated: "Aura değişti 🧬", auraSaved: "Aura kaydedildi", photoSaved: "Görüntü kaydedildi", reset: "Ayarlar sıfırlandı", spell: "AURA GÜCÜ — UYAN!" },
        ranks: ["SIRADAN AURA", "NADİR AURA", "EPİK AURA", "EFSANEVİ AURA", "MİTİK AURA"],
        placeholder: "Aura gücü — uyan!"
    },
    it: {
        tabs: ["Aura", "Eroe", "Mondo", "Magia"],
        headings: ["Avvio rapido", "Scegli un'aura", "Personaggio", "Crea il tuo eroe", "Ambiente", "Scegli un'arena", "Abilità", "Lancia la magia"],
        labels: ["Tipo di aura", "Colore", "Densità", "Velocità", "Raggio", "Dimensione particelle", "Forma particelle", "Movimento", "Comportamento", "Vestito", "Copricapo", "Arma", "Posa", "Compagno", "Distanza camera", "Luminosità", "Frase dell'eroe"],
        buttons: ["Mutazione", "Eroe casuale", "Reimposta camera", "LANCIA MAGIA", "Tutto casuale", "Reimposta tutto", "MAGIA", "Salva", "Foto"],
        misc: ["Impostazioni avanzate", "Puoi rilanciare dopo mezzo secondo.", "Impostazioni salvate localmente", "Potenza energetica", "ruota", "zoom"],
        auraTypes: ["Flusso orbitale", "Anelli energetici", "Tempesta elettrica", "Alone celeste"],
        shapes: ["Blocchi Roblox", "Sfere di luce", "Fiamme", "Polvere stellare"],
        directions: ["Su", "Giù", "Verso l'interno"], behaviors: ["Flusso", "Impulso", "Caos"],
        outfits: ["Mago", "Roblox Noob", "Cavaliere del Vuoto", "Demone Neon", "Predone Cyber", "Re Dorato", "Ninja Ombra", "Eroe di Strada"],
        hats: ["Nessun copricapo", "Cappello da mago", "Corna demoniache"], weapons: ["Mani vuote", "Bastone magico", "Spada laser", "Spada da cavaliere"],
        poses: ["Posa magica", "Levitazione", "Pronto al combattimento", "Posa eroica", "Ninja", "Vittoria", "Meditazione", "Breakdance"],
        pets: ["Nessun animale", "Spirito cubo", "Fuoco fatuo"], biomes: [["Abisso", "Spazio freddo"], ["Matrice", "Rete neon"], ["Oscurità", "Niente di più"]],
        magic: ["Impulso", "Fulmine", "Portale", "Meteora"],
        messages: { saving: "Salvataggio…", saved: "Salvato localmente", heroReady: "Nuovo eroe pronto", comboReady: "Nuova combinazione pronta", mutated: "Aura mutata 🧬", auraSaved: "Aura salvata", photoSaved: "Immagine salvata", reset: "Impostazioni ripristinate", spell: "POTERE DELL'AURA — SVEGLIATI!" },
        ranks: ["AURA COMUNE", "AURA RARA", "AURA EPICA", "AURA LEGGENDARIA", "AURA MITICA"], placeholder: "Potere dell'aura — svegliati!"
    },
    es: {
        tabs: ["Aura", "Héroe", "Mundo", "Magia"],
        headings: ["Inicio rápido", "Elige un aura", "Personaje", "Crea tu héroe", "Entorno", "Elige una arena", "Habilidad", "Lanza magia"],
        labels: ["Tipo de aura", "Color", "Densidad", "Velocidad", "Radio", "Tamaño de partículas", "Forma de partículas", "Movimiento", "Comportamiento", "Atuendo", "Sombrero", "Arma", "Pose", "Compañero", "Distancia de cámara", "Brillo", "Frase del héroe"],
        buttons: ["Mutación", "Héroe aleatorio", "Reiniciar cámara", "LANZAR MAGIA", "Todo aleatorio", "Reiniciar todo", "MAGIA", "Guardar", "Foto"],
        misc: ["Ajustes avanzados", "Puedes volver a lanzar en medio segundo.", "Ajustes guardados localmente", "Nivel de energía", "rotar", "zoom"],
        auraTypes: ["Flujo orbital", "Anillos de energía", "Tormenta eléctrica", "Halo celestial"], shapes: ["Bloques Roblox", "Esferas de luz", "Llamas", "Polvo estelar"],
        directions: ["Arriba", "Abajo", "Hacia dentro"], behaviors: ["Flujo", "Pulso", "Caos"],
        outfits: ["Mago", "Roblox Noob", "Caballero del Vacío", "Demonio Neón", "Asaltante Cíber", "Rey Dorado", "Ninja Sombrío", "Héroe Urbano"],
        hats: ["Sin sombrero", "Sombrero de mago", "Cuernos demoníacos"], weapons: ["Manos vacías", "Bastón mágico", "Espada de luz", "Espada de caballero"],
        poses: ["Postura mágica", "Levitación", "Listo para luchar", "Pose de héroe", "Ninja", "Victoria", "Meditación", "Breakdance"],
        pets: ["Sin mascota", "Espíritu cúbico", "Orbe de energía"], biomes: [["Abismo", "Espacio frío"], ["Matriz", "Red neón"], ["Oscuridad", "Sin distracciones"]],
        magic: ["Impulso", "Rayo", "Portal", "Meteoro"],
        messages: { saving: "Guardando…", saved: "Guardado localmente", heroReady: "Nuevo héroe listo", comboReady: "Nueva combinación lista", mutated: "Aura mutada 🧬", auraSaved: "Aura guardada", photoSaved: "Imagen guardada", reset: "Ajustes reiniciados", spell: "PODER DEL AURA — ¡DESPIERTA!" },
        ranks: ["AURA COMÚN", "AURA RARA", "AURA ÉPICA", "AURA LEGENDARIA", "AURA MÍTICA"], placeholder: "Poder del aura — ¡despierta!"
    },
    pt: {
        tabs: ["Aura", "Herói", "Mundo", "Magia"],
        headings: ["Início rápido", "Escolha uma aura", "Personagem", "Monte seu herói", "Ambiente", "Escolha uma arena", "Habilidade", "Lance magia"],
        labels: ["Tipo de aura", "Cor", "Densidade", "Velocidade", "Raio", "Tamanho das partículas", "Forma das partículas", "Movimento", "Comportamento", "Roupa", "Chapéu", "Arma", "Pose", "Companheiro", "Distância da câmera", "Brilho", "Frase do herói"],
        buttons: ["Mutação", "Herói aleatório", "Redefinir câmera", "LANÇAR MAGIA", "Tudo aleatório", "Redefinir tudo", "MAGIA", "Salvar", "Foto"],
        misc: ["Configurações avançadas", "Você pode lançar novamente em meio segundo.", "Configurações salvas localmente", "Nível de energia", "girar", "zoom"],
        auraTypes: ["Fluxo orbital", "Anéis de energia", "Tempestade elétrica", "Halo celestial"], shapes: ["Blocos Roblox", "Esferas de luz", "Chamas", "Poeira estelar"],
        directions: ["Para cima", "Para baixo", "Para dentro"], behaviors: ["Fluxo", "Pulso", "Caos"],
        outfits: ["Mago", "Roblox Noob", "Cavaleiro do Vazio", "Demônio Neon", "Invasor Cibernético", "Rei Dourado", "Ninja Sombrio", "Herói Urbano"],
        hats: ["Sem chapéu", "Chapéu de mago", "Chifres demoníacos"], weapons: ["Mãos vazias", "Cajado mágico", "Espada de luz", "Espada de cavaleiro"],
        poses: ["Postura mágica", "Levitação", "Pronto para lutar", "Pose de herói", "Ninja", "Vitória", "Meditação", "Breakdance"],
        pets: ["Sem mascote", "Espírito cúbico", "Orbe de energia"], biomes: [["Abismo", "Espaço frio"], ["Matriz", "Rede neon"], ["Escuridão", "Sem distrações"]],
        magic: ["Pulso", "Raio", "Portal", "Meteoro"],
        messages: { saving: "Salvando…", saved: "Salvo localmente", heroReady: "Novo herói pronto", comboReady: "Nova combinação pronta", mutated: "Aura alterada 🧬", auraSaved: "Aura salva", photoSaved: "Imagem salva", reset: "Configurações redefinidas", spell: "PODER DA AURA — DESPERTE!" },
        ranks: ["AURA COMUM", "AURA RARA", "AURA ÉPICA", "AURA LENDÁRIA", "AURA MÍTICA"], placeholder: "Poder da aura — desperte!"
    },
    pl: {
        tabs: ["Aura", "Bohater", "Świat", "Magia"],
        headings: ["Szybki start", "Wybierz aurę", "Postać", "Stwórz bohatera", "Otoczenie", "Wybierz arenę", "Umiejętność", "Rzuć zaklęcie"],
        labels: ["Rodzaj aury", "Kolor", "Gęstość", "Prędkość", "Promień", "Rozmiar cząstek", "Kształt cząstek", "Ruch", "Zachowanie", "Strój", "Nakrycie głowy", "Broń", "Poza", "Towarzysz", "Odległość kamery", "Jasność", "Kwestia bohatera"],
        buttons: ["Mutacja", "Losowy bohater", "Resetuj kamerę", "RZUĆ ZAKLĘCIE", "Losuj wszystko", "Resetuj wszystko", "MAGIA", "Zapisz", "Zdjęcie"],
        misc: ["Ustawienia zaawansowane", "Możesz użyć ponownie po pół sekundy.", "Ustawienia zapisują się lokalnie", "Poziom energii", "obrót", "zbliżenie"],
        auraTypes: ["Przepływ orbitalny", "Pierścienie energii", "Burza piorunów", "Niebiańska aureola"], shapes: ["Klocki Roblox", "Kule światła", "Płomienie", "Gwiezdny pył"],
        directions: ["W górę", "W dół", "Do środka"], behaviors: ["Przepływ", "Puls", "Chaos"],
        outfits: ["Mag", "Roblox Noob", "Rycerz Pustki", "Neonowy Demon", "Cybernetyczny Najeźdźca", "Złoty Król", "Ninja Cienia", "Uliczny Bohater"],
        hats: ["Bez nakrycia", "Kapelusz maga", "Demoniczne rogi"], weapons: ["Puste ręce", "Magiczna laska", "Miecz świetlny", "Miecz rycerski"],
        poses: ["Magiczna postawa", "Lewitacja", "Gotowość bojowa", "Poza bohatera", "Ninja", "Zwycięstwo", "Medytacja", "Breakdance"],
        pets: ["Bez zwierzaka", "Kostkowy duch", "Energetyczny ognik"], biomes: [["Otchłań", "Zimny kosmos"], ["Matryca", "Neonowa sieć"], ["Ciemność", "Bez rozpraszania"]],
        magic: ["Impuls", "Piorun", "Portal", "Meteor"],
        messages: { saving: "Zapisywanie…", saved: "Zapisano lokalnie", heroReady: "Nowy bohater gotowy", comboReady: "Nowa kombinacja gotowa", mutated: "Aura zmutowała 🧬", auraSaved: "Aura zapisana", photoSaved: "Obraz zapisany", reset: "Ustawienia zresetowane", spell: "MOC AURY — PRZEBUDŹ SIĘ!" },
        ranks: ["ZWYKŁA AURA", "RZADKA AURA", "EPICKA AURA", "LEGENDARNA AURA", "MITYCZNA AURA"], placeholder: "Moc aury — przebudź się!"
    },
    id: {
        tabs: ["Aura", "Pahlawan", "Dunia", "Sihir"],
        headings: ["Mulai cepat", "Pilih aura", "Karakter", "Buat pahlawanmu", "Lingkungan", "Pilih arena", "Kemampuan", "Gunakan sihir"],
        labels: ["Jenis aura", "Warna", "Kepadatan", "Kecepatan", "Radius", "Ukuran partikel", "Bentuk partikel", "Gerakan", "Perilaku", "Pakaian", "Penutup kepala", "Senjata", "Pose", "Pendamping", "Jarak kamera", "Kecerahan", "Ucapan pahlawan"],
        buttons: ["Mutasi", "Pahlawan acak", "Atur ulang kamera", "GUNAKAN SIHIR", "Acak semua", "Atur ulang semua", "SIHIR", "Simpan", "Foto"],
        misc: ["Pengaturan lanjutan", "Dapat digunakan lagi setelah setengah detik.", "Pengaturan disimpan secara lokal", "Peringkat energi", "putar", "zoom"],
        auraTypes: ["Aliran orbit", "Cincin energi", "Badai petir", "Halo langit"], shapes: ["Balok Roblox", "Bola cahaya", "Api", "Debu bintang"],
        directions: ["Naik", "Turun", "Ke dalam"], behaviors: ["Aliran", "Denyut", "Kekacauan"],
        outfits: ["Penyihir", "Roblox Noob", "Ksatria Void", "Iblis Neon", "Penyerbu Siber", "Raja Emas", "Ninja Bayangan", "Pahlawan Jalanan"],
        hats: ["Tanpa penutup", "Topi penyihir", "Tanduk iblis"], weapons: ["Tangan kosong", "Tongkat sihir", "Pedang cahaya", "Pedang ksatria"],
        poses: ["Sikap sihir", "Melayang", "Siap bertarung", "Pose pahlawan", "Ninja", "Kemenangan", "Meditasi", "Breakdance"],
        pets: ["Tanpa peliharaan", "Roh kubus", "Gumpalan energi"], biomes: [["Jurang", "Angkasa dingin"], ["Matriks", "Jaringan neon"], ["Kegelapan", "Tanpa gangguan"]],
        magic: ["Denyut", "Petir", "Portal", "Meteor"],
        messages: { saving: "Menyimpan…", saved: "Tersimpan lokal", heroReady: "Pahlawan baru siap", comboReady: "Kombinasi baru siap", mutated: "Aura bermutasi 🧬", auraSaved: "Aura tersimpan", photoSaved: "Gambar tersimpan", reset: "Pengaturan direset", spell: "KEKUATAN AURA — BANGKIT!" },
        ranks: ["AURA BIASA", "AURA LANGKA", "AURA EPIK", "AURA LEGENDARIS", "AURA MITOS"], placeholder: "Kekuatan aura — bangkit!"
    },
    ar: {
        tabs: ["الهالة", "البطل", "العالم", "السحر"],
        headings: ["بدء سريع", "اختر هالة", "الشخصية", "أنشئ بطلك", "البيئة", "اختر ساحة", "القدرة", "أطلق السحر"],
        labels: ["نوع الهالة", "اللون", "الكثافة", "السرعة", "النطاق", "حجم الجسيمات", "شكل الجسيمات", "الحركة", "السلوك", "الزي", "غطاء الرأس", "السلاح", "الوضعية", "الرفيق", "مسافة الكاميرا", "السطوع", "عبارة البطل"],
        buttons: ["تحوّل", "بطل عشوائي", "إعادة الكاميرا", "أطلق السحر", "عشوائي بالكامل", "إعادة الكل", "سحر", "حفظ", "صورة"],
        misc: ["إعدادات متقدمة", "يمكنك الإطلاق مجدداً بعد نصف ثانية.", "تُحفظ الإعدادات محلياً", "تقييم الطاقة", "تدوير", "تكبير"],
        auraTypes: ["تدفق مداري", "حلقات طاقة", "عاصفة رعدية", "هالة سماوية"], shapes: ["مكعبات روبلوكس", "كرات ضوء", "لهب", "غبار نجوم"],
        directions: ["للأعلى", "للأسفل", "للداخل"], behaviors: ["تدفق", "نبض", "فوضى"],
        outfits: ["ساحر", "روبلوكس نوب", "فارس الفراغ", "شيطان نيون", "مغير سيبراني", "الملك الذهبي", "نينجا الظل", "بطل الشارع"],
        hats: ["بدون غطاء", "قبعة ساحر", "قرون شيطان"], weapons: ["يدان فارغتان", "عصا سحرية", "سيف ضوئي", "سيف فارس"],
        poses: ["وقفة سحرية", "تحليق", "استعداد للقتال", "وقفة بطل", "نينجا", "نصر", "تأمل", "بريك دانس"],
        pets: ["بدون حيوان", "روح مكعبة", "كتلة طاقة"], biomes: [["الهاوية", "فضاء بارد"], ["المصفوفة", "شبكة نيون"], ["الظلام", "بلا تشتيت"]],
        magic: ["نبضة", "برق", "بوابة", "نيزك"],
        messages: { saving: "جارٍ الحفظ…", saved: "تم الحفظ محلياً", heroReady: "البطل الجديد جاهز", comboReady: "التوليفة الجديدة جاهزة", mutated: "تحولت الهالة 🧬", auraSaved: "تم حفظ الهالة", photoSaved: "تم حفظ الصورة", reset: "تمت إعادة الإعدادات", spell: "قوة الهالة — استيقظي!" },
        ranks: ["هالة عادية", "هالة نادرة", "هالة ملحمية", "هالة أسطورية", "هالة خرافية"], placeholder: "قوة الهالة — استيقظي!"
    }
};

const optionValues = {
    auraType: ["orbit", "rings", "storm", "halo"],
    shape: ["cube", "sphere", "fire", "star"],
    direction: ["up", "down", "inward"],
    fxMode: ["smooth", "pulse", "chaos"],
    outfit: ["default", "noob", "knight", "void", "cyber", "royal", "ninja", "casual"],
    hat: ["none", "wizardHat", "horns"],
    weapon: ["none", "staff", "lightsaber", "sword"],
    pose: ["wizard", "float", "combat", "hero", "ninja", "victory", "meditate", "dance"],
    pet: ["none", "cubeSp", "wisp"],
    magicType: ["shockwave", "lightning", "portal", "meteor"]
};

function browserLanguage() {
    const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const candidate of candidates) {
        const code = candidate?.toLowerCase().split("-")[0];
        if (SUPPORTED.includes(code)) return code;
    }
    return "en";
}

function setLeadText(selector, text) {
    const element = document.querySelector(selector);
    if (!element) return;
    const node = [...element.childNodes].find((child) => child.nodeType === Node.TEXT_NODE && child.nodeValue.trim());
    if (node) node.nodeValue = `${text} `;
    else element.append(document.createTextNode(text));
}

function setOptions(id, values, labels) {
    values.forEach((value, index) => {
        const option = document.querySelector(`#${id} option[value="${value}"]`);
        if (option) option.textContent = labels[index];
    });
}

export function createI18n() {
    const selector = document.getElementById("language");
    const stored = localStorage.getItem(LANGUAGE_KEY) || "auto";
    const saved = stored === "auto" || SUPPORTED.includes(stored) ? stored : "auto";
    selector.value = saved;
    let current = saved === "auto" ? browserLanguage() : saved;

    function apply(language = current) {
        current = SUPPORTED.includes(language) ? language : "en";
        const t = translations[current] || translations.en;
        document.documentElement.lang = current;
        document.documentElement.dir = current === "ar" ? "rtl" : "ltr";

        ["aura", "hero", "world", "magic"].forEach((tab, index) => setLeadText(`.tab[data-tab="${tab}"]`, t.tabs[index]));
        const panels = ["aura", "hero", "world", "magic"];
        panels.forEach((panel, index) => {
            document.querySelector(`[data-panel="${panel}"] .eyebrow`).textContent = t.headings[index * 2];
            document.querySelector(`[data-panel="${panel}"] h2`).textContent = t.headings[index * 2 + 1];
        });

        const labelIds = ["auraType", "color", "count", "speed", "glow", "size", "shape", "direction", "fxMode", "outfit", "hat", "weapon", "pose", "pet", "cameraZoom", "lightPower", "spell"];
        labelIds.forEach((id, index) => setLeadText(`label[for="${id}"]`, t.labels[index]));
        document.querySelector(".advanced summary").textContent = t.misc[0];
        document.querySelector(".panel-note").textContent = t.misc[1];
        document.getElementById("saveStatus").textContent = t.misc[2];
        document.querySelector(".power-card .eyebrow").textContent = t.misc[3];
        document.querySelector(".hint").innerHTML = `<span>LMB</span> ${t.misc[4]} <span>wheel</span> ${t.misc[5]}`;

        const buttonTargets = [
            ["#mutateBtn", `🧬 ${t.buttons[0]}`], ["#randomHeroBtn", `🎲 ${t.buttons[1]}`],
            ["#resetCameraBtn", `⌖ ${t.buttons[2]}`], ["#speakBtn strong", t.buttons[3]],
            ["#randomBtn", `🎲 ${t.buttons[4]}`], ["#resetBtn", t.buttons[5]],
            ["#ultimateMobile", `⚡ ${t.buttons[6]}`], ["#saveBtn span", t.buttons[7]], ["#photoBtn span", t.buttons[8]]
        ];
        buttonTargets.forEach(([target, text]) => { document.querySelector(target).textContent = text; });

        setOptions("auraType", optionValues.auraType, t.auraTypes);
        setOptions("shape", optionValues.shape, t.shapes);
        setOptions("direction", optionValues.direction, t.directions);
        setOptions("fxMode", optionValues.fxMode, t.behaviors);
        setOptions("outfit", optionValues.outfit, t.outfits);
        setOptions("hat", optionValues.hat, t.hats);
        setOptions("weapon", optionValues.weapon, t.weapons);
        setOptions("pose", optionValues.pose, t.poses);
        setOptions("pet", optionValues.pet, t.pets);
        setOptions("magicType", optionValues.magicType, t.magic);
        document.querySelectorAll(".magic-card strong").forEach((element, index) => { element.textContent = t.magic[index]; });
        document.querySelectorAll(".biome-card").forEach((card, index) => {
            card.querySelector("strong").textContent = t.biomes[index][0];
            card.querySelector("small").textContent = t.biomes[index][1];
        });
        document.getElementById("spell").placeholder = t.placeholder;
        return t;
    }

    selector.addEventListener("change", () => {
        localStorage.setItem(LANGUAGE_KEY, selector.value);
        apply(selector.value === "auto" ? browserLanguage() : selector.value);
        window.dispatchEvent(new CustomEvent("aura:languagechange"));
    });

    return {
        apply,
        get language() { return current; },
        get t() { return translations[current] || translations.en; }
    };
}
