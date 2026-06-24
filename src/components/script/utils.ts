export {getBarColor};

function getBarColor(temp:number):string{
      const gradient = [
        "rgba(182, 144, 255 , 1.0)", 
        "rgba(70, 200, 157, 1.0)", 
        "rgba(63, 116, 126, 1.0)",
        "rgba(220, 143, 0, 1.0)",
        "rgba(197, 67, 20, 1.0)",
        "rgba(255, 0, 43, 1.0)"
      ];
      let result;
      switch(true){
        
        case temp <= 0 :
          result = gradient[0];
          break;
        case temp <= 10 :
          result = gradient[1];
          break;
        case temp <= 20 :
          result = gradient[2];
          break;
        case temp <=30 :
          result = gradient[3];
          break;
        case temp <= 40 :
          result = gradient[4];
          break;
        case temp > 40 :
          result = gradient[5];
          break;
        default:
          result = gradient[1];
      }

      return result;
    }

    
