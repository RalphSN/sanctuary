window.onload = function () {
  // ** Preloader**
  const preloader = document.querySelector(".preloader");
  const allElements = document.querySelectorAll(".navbar, .footer, .main");
  const coverImg = document.querySelector(".cover .cover-image-container img");

  // ** 漢堡選單功能**
  const menuButton = document.querySelector(".hamburger-menu");
  const menu = document.querySelector(".navbar-auth-slide");
  const overlay = document.querySelector(".menu-overlay");
  const closeButton = document.querySelector(".close-menu");
  const navbarLinks = document.querySelectorAll(".navbar-links a");

  // ** Service item => Hover-Lightbox
  // const serviceItems = document.querySelectorAll(".service-item");

  // ** 計算滾軸寬度**
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  // ** 禁用滾動位置記憶，確保重新整理回到頂部**
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  // ** 強制滾動到頂部，確保 preloader 可見**
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);

  // ** Preloader**
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollbarWidth}px`; // 避免頁面跳動
  const fixedElements = document.querySelectorAll(".navbar, .footer");
  fixedElements.forEach((el) => {
    el.style.paddingRight = `${scrollbarWidth}px`;
  });

  setTimeout(() => {
    preloader.classList.add("hidden");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    allElements.forEach((el) => {
      el.classList.add("loaded");
    });
    fixedElements.forEach((el) => {
      el.style.paddingRight = "";
    });
    setTimeout(() => {
      allElements.forEach((el) => {
        el.style.display = "flex";
      }, 500);
    });
    coverImg.style.display = "block";
  }, 1500);

  // **攔截 a 不改變網址**
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      const navbar = document.querySelector(".navbar");
      const navbarHeight = navbar ? navbar.offsetHeight : 0;

      if (targetElement) {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: targetElement.offsetTop - navbarHeight,
            behavior: "smooth",
          });
        });
      }
    });
  });

  if (menuButton && menu && overlay && closeButton) {
    menuButton.addEventListener("click", function (event) {
      menu.classList.add("open");
      overlay.classList.add("open");
      event.stopPropagation();
    });

    closeButton.addEventListener("click", function () {
      menu.classList.remove("open");
      overlay.classList.remove("open");
    });

    overlay.addEventListener("click", function () {
      menu.classList.remove("open");
      overlay.classList.remove("open");
    });

    document.addEventListener("click", function (event) {
      if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
        menu.classList.remove("open");
        overlay.classList.remove("open");
      }
    });

    // ** 點擊選單內連結後關閉選單**
    navbarLinks.forEach((link) => {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        overlay.classList.remove("open");
      });
    });
  }

  // ** 語言切換**
  document.querySelectorAll(".dropdown-menu li").forEach((item) => {
    item.addEventListener("click", function () {
      const lang = item.getAttribute("data-lang");
      if (lang) {
        localStorage.setItem("language", lang);
        location.reload();
      }
    });
  });

  // ** Swiper.js 輪播功能**
  const worksSlider = document.querySelector(".works-slider");
  if (worksSlider) {
    new Swiper(".works-slider", {
      loop: false,
      loopAdditionalSlides: 1,
      loopedSlides: 3,
      spaceBetween: 20,
      slidesPerView: 1,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  } else {
    console.error("Swiper container not found!");
  }

  // ** Go Top 按鈕功能**
  const goTopButton = document.getElementById("goTopButton");

  if (goTopButton) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        goTopButton.classList.add("show");
      } else {
        goTopButton.classList.remove("show");
      }
    });

    goTopButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // serviceItems.forEach((item) => {
  //   const inner = item.querySelector(".service-item-inner");
  //   const details = item.querySelector(".service-item-details");

  //   let isHovered = false;

  //   item.addEventListener("mouseenter", () => {
  //     isHovered = true;
  //     inner.style.transform = "scale(2)";
  //     inner.style.zIndex = "10";
  //     details.style.visibility = "visible";
  //     setTimeout(() => {
  //       if (isHovered) details.style.opacity = "1";
  //     }, 100);
  //   });

  //   item.addEventListener("mouseleave", () => {
  //     isHovered = false;

  //     setTimeout(() => {
  //       if (!isHovered) {
  //         details.style.opacity = "0";
  //         setTimeout(() => {
  //           if (!isHovered) {
  //             inner.style.transform = "scale(1)";
  //             details.style.visibility = "hidden";
  //             details.style.opacity = "0";
  //             setTimeout(() => {
  //               inner.style.zIndex = "5";
  //             }, 100);
  //           }
  //         }, 10);
  //       }
  //     }, 10);
  //   });
  // });
};

class CustomLightbox {
  constructor() {
    this.lightbox = document.getElementById("customLightbox");
    this.lightboxText = document.getElementById("lightboxText");
    this.closeBtn = document.getElementById("lightboxClose");

    // 文字內容定義 - 根據你的需求修改這裡
    this.textContent = {
      text1: {
        text: "専門スタッフが迅速に対応し、プレイヤーの疑問や問題を解決。快適なゲーム体験と高い満足度をサポートします。",
        className: "text1",
      },
      text2: {
        text: "効率的で簡単なSDK接続を提供。開発コストを削減し、短期間でゲーム機能を実装できます。",
        className: "text2",
      },
      text3: {
        text: "お客様の要望に応じて、各種プラットフォーム・ジャンルに対応したオリジナルゲームを制作。創意と遊び心を形にします。",
        className: "text3",
      },
      text4: {
        text: "ゲームのリリースから市場宣伝まで幅広くサポート。認知度向上とプレイヤーへのリーチを最大化します。",
        className: "text4",
      },
      text5: {
        text: "UIや操作フローを最適化し、ユーザー定着率と操作満足度を高め、プラットフォームの魅力を向上させます。",
        className: "text5",
      },
    };

    this.init();
  }

  init() {
    // 檢查必要元素是否存在
    if (!this.lightbox || !this.lightboxText || !this.closeBtn) {
      console.error("Lightbox elements not found");
      return;
    }

    // 綁定點擊事件到所有服務項目
    this.bindServiceItems();

    // 關閉按鈕事件
    this.closeBtn.addEventListener("click", () => this.close());

    // 點擊背景關閉
    this.lightbox.addEventListener("click", (e) => {
      if (e.target === this.lightbox) {
        this.close();
      }
    });

    // ESC 鍵關閉
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.lightbox.classList.contains("active")) {
        this.close();
      }
    });

    // 防止觸控滑動時背景滾動
    this.lightbox.addEventListener(
      "touchmove",
      (e) => {
        // 允許 lightbox 內容滾動，但防止背景滾動
        const target = e.target;
        const lightboxContent = target.closest(".lightbox-text");

        if (!lightboxContent) {
          e.preventDefault();
        }
      },
      { passive: false }
    );

    console.log("CustomLightbox initialized");
  }

  bindServiceItems() {
    // 自動偵測並綁定服務項目
    const serviceItems = document.querySelectorAll(".service-item");

    serviceItems.forEach((item, index) => {
      // 根據 class 名稱或索引決定內容
      let contentKey = null;

      // 方法1：根據 class 名稱
      if (item.classList.contains("item1")) contentKey = "text1";
      else if (item.classList.contains("item2")) contentKey = "text2";
      else if (item.classList.contains("item3")) contentKey = "text3";
      else if (item.classList.contains("item4")) contentKey = "text4";
      else if (item.classList.contains("item5")) contentKey = "text5";

      // 方法2：如果沒有找到對應的 class，根據索引
      if (!contentKey) {
        contentKey = `text${index + 1}`;
      }

      // 只有當內容存在時才綁定事件
      if (this.textContent[contentKey]) {
        item.style.cursor = "pointer";
        item.addEventListener("click", (e) => {
          e.preventDefault();
          this.open(contentKey);
        });

        // 添加鍵盤可訪問性
        item.setAttribute("tabindex", "0");
        item.setAttribute("role", "button");
        item.setAttribute("aria-label", `服務項目 ${index + 1} - 點擊查看詳情`);

        item.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this.open(contentKey);
          }
        });
      }
    });

    console.log(`Bound ${serviceItems.length} service items`);
  }

  open(contentKey) {
    if (!this.textContent[contentKey]) {
      console.error(`Content not found for key: ${contentKey}`);
      return;
    }

    const content = this.textContent[contentKey];

    try {
      // 設定內容和樣式
      this.lightboxText.textContent = content.text;
      this.lightboxText.className = "lightbox-text " + content.className;

      // 簡單的背景固定，不記錄滾動位置
      document.body.classList.add("lightbox-open");

      // 顯示 lightbox
      this.lightbox.classList.add("active");

      // 聚焦到關閉按鈕（可訪問性）
      setTimeout(() => {
        this.closeBtn.focus();
      }, 100);

      console.log(`Lightbox opened: ${contentKey}`);
    } catch (error) {
      console.error("Error opening lightbox:", error);
    }
  }

  close() {
    try {
      // 添加關閉動畫類別
      this.lightbox.classList.add("closing");

      // 動畫完成後隱藏
      setTimeout(() => {
        this.lightbox.classList.remove("active", "closing");

        // 簡單的背景恢復
        document.body.classList.remove("lightbox-open");

        // 清除內容（可選）
        this.lightboxText.textContent = "";
        this.lightboxText.className = "lightbox-text";

        console.log("Lightbox closed");
      }, 300); // 配合 CSS 動畫時間
    } catch (error) {
      console.error("Error closing lightbox:", error);
    }
  }

  // 公開方法：動態更新內容
  updateContent(contentKey, newText, newClassName = null) {
    if (this.textContent[contentKey]) {
      this.textContent[contentKey].text = newText;
      if (newClassName) {
        this.textContent[contentKey].className = newClassName;
      }
      console.log(`Content updated for ${contentKey}`);
    }
  }

  // 公開方法：添加新內容
  addContent(contentKey, text, className) {
    this.textContent[contentKey] = {
      text: text,
      className: className,
    };
    console.log(`New content added: ${contentKey}`);
  }

  // 公開方法：檢查是否正在顯示
  isOpen() {
    return this.lightbox.classList.contains("active");
  }

  // 公開方法：強制關閉（用於外部調用）
  forceClose() {
    if (this.isOpen()) {
      this.close();
    }
  }
}

// 自動初始化
let customLightbox;

// DOM 載入完成後初始化
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeLightbox);
} else {
  // 如果 DOM 已經載入完成，直接初始化
  initializeLightbox();
}

function initializeLightbox() {
  try {
    customLightbox = new CustomLightbox();

    // 全域可用（方便除錯或外部調用）
    window.customLightbox = customLightbox;
  } catch (error) {
    console.error("Failed to initialize CustomLightbox:", error);
  }
}

// 提供全域方法（可選）
window.openLightbox = function (contentKey) {
  if (customLightbox) {
    customLightbox.open(contentKey);
  }
};

window.closeLightbox = function () {
  if (customLightbox) {
    customLightbox.close();
  }
};

// 處理頁面卸載時的清理
window.addEventListener("beforeunload", function () {
  if (customLightbox && customLightbox.isOpen()) {
    customLightbox.forceClose();
  }
});
