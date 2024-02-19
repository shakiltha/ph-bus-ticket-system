const seatButtons = document.querySelectorAll(".seat-btn");
const seatCounter = document.getElementById("seat-counter");
const seatCounter2 = document.getElementById("seat-counter2");
const seatParent = document.getElementById("seat-div");
const classParent = document.getElementById("class-div");
const priceParent = document.getElementById("price-div");
const totalPrice = document.getElementById("total-price");
const grandPrice = document.getElementById("grand-price");
const inputNumber = document.getElementById("input-number");
const nextBtn = document.getElementById("next-btn");
const couponInput = document.getElementById("coupon-input");
const couponBtn = document.getElementById("coupon-btn");
const appendDiscounts = document.getElementById("append-discounts");
const discountElem = document.getElementById("d-discount");
const discountPrice = document.getElementById("d-price");

function seatFunctionality(seatButtons) {
  let seatCount = 40;
  let seatAdd = 0;
  let priceCounter = 0;
  let selected = [];

  for (let i = 0; i < seatButtons.length; i++) {
    seatButtons[i].addEventListener("click", (e) => {
      e.preventDefault();
      if (seatButtons[i].classList.contains("bg-[#F7F8F8]")) {
        selected.push(seatButtons[i]);
        if (selected.length > 4) {
          alert("you can only select/buy 4 tickets at once");
          return;
        }

        couponInput.addEventListener("input", (e) => {
          // console.log(e.target.value);
          if (couponInput.value === "NEW15" && selected.length === 4) {
            let discount = (priceCounter * 15) / 100;
            couponBtn.addEventListener("click", () => {
              // console.log(discount);
              discountElem.style.display = "block";
              discountPrice.textContent = discount;
              let grandTotal = priceCounter - discount;
              grandPrice.textContent = grandTotal;
              couponInput.style.display = "none";
              couponBtn.style.display = "none";
            });
            couponBtn.removeAttribute("disabled");
          } else if (
            couponInput.value === "Couple 20" &&
            selected.length <= 4
          ) {
            let discount = (priceCounter * 20) / 100;
            couponBtn.addEventListener("click", () => {
              // console.log(discount);
              discountElem.style.display = "block";
              discountPrice.textContent = discount;
              let grandTotal = priceCounter - discount;
              grandPrice.textContent = grandTotal;
              couponInput.style.display = "none";
              couponBtn.style.display = "none";
            });
            couponBtn.removeAttribute("disabled");
          } else {
            couponBtn.setAttribute("disabled", "");
            return;
          }
        });

        inputNumber.addEventListener("input", (e) => {
          e.preventDefault();
          if (
            inputNumber.value &&
            seatButtons[i].classList.contains("bg-[#1dd100]")
          ) {
            nextBtn.removeAttribute("disabled");
          } else {
            nextBtn.setAttribute("disabled", "");
          }
        });

        seatButtons[i].classList.remove("bg-[#F7F8F8]");
        seatButtons[i].classList.add("bg-[#1dd100]");
        seatCount--;
        seatCounter.innerText = seatCount;
        seatAdd++;
        seatCounter2.innerText = seatAdd;
        const eventTarget = e.target.innerText;
        priceCounter += 550;
        appendElement(
          seatParent,
          classParent,
          priceParent,
          eventTarget,
          priceCounter
        );
      } else {
        console.log(priceCounter);
        seatButtons[i].classList.add("bg-[#F7F8F8]");
        seatButtons[i].classList.remove("bg-[#1dd100]");

        // priceCounter = priceCounter - 550;
        // appendElement(priceCounter);

        seatCount++;
        seatCounter.innerText = seatCount;
        seatAdd--;
        seatCounter2.innerText = seatAdd;

        let pSeat = document.querySelector(".p-seatName");
        seatParent.removeChild(pSeat);
        let pSeatType = document.querySelector(".p-seatType");
        classParent.removeChild(pSeatType);
        let pPrice = document.querySelector(".p-price");
        priceParent.removeChild(pPrice);
      }
    });
  }
}
seatFunctionality(seatButtons);

// if (seatButtons.classList.contains("bg-[#1dd100]") > 4) {
//   alert("you can only select/buy 4 tickets");
// }

function appendElement(
  seatParent,
  classParent,
  priceParent,
  eventTarget,
  priceCounter
) {
  const p = document.createElement("p");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");

  p.textContent = eventTarget;
  p.classList.add("p-seatName");
  seatParent.appendChild(p);
  p1.textContent = "Economy";
  p1.classList.add("p-seatType");
  classParent.appendChild(p1);
  p2.textContent = 550;
  p2.classList.add("p-price");
  priceParent.appendChild(p2);
  totalPrice.textContent = priceCounter;
}

// console.log(buttonValues);
