export function getPriceText(price, type, currency) {
    let text = "";
  
    switch (type) {
      case "FIXED":
        text = price + " " + currency;
        break;
      case "FROM":
        text = price + " " + currency + "-dan başlayır";
        break;
      case "FREE":
        text = "Pulsuz";
        break;
      case "RANGE":
        text = price + " " + currency;
        break;
      default:
        break;
    }
  
    return text;
  }
  
  export function getPrice(pricingOption) {
    let price = pricingOption?.price;
    if (pricingOption.priceType === "RANGE") {
      price = pricingOption.priceMin + "-" + pricingOption.price;
    }
    if (pricingOption?.specialPrice) {
      price = pricingOption?.specialPrice;
    }
    return getPriceText(
      price,
      pricingOption?.priceType,
      pricingOption?.currency === undefined
        ? "AZN"
        : pricingOption?.currency,
    );
  }
  
  const priceType = {
    FROM: "Başlanğıç",
    FIXED: "Fiks",
    FREE: "Pulsuz",
  };