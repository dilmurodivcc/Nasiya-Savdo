import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-menu">
      <div className="container">
        <ul>
          <NavLink className="navlink" to="/">
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.93038 1.23522C8.18567 0.993859 8.52367 0.859375 8.875 0.859375C9.22633 0.859375 9.56433 0.993859 9.81963 1.23522L16.4801 7.53135C16.8926 7.92047 17.125 8.4636 17.125 9.0301V16.6888C17.125 17.2359 16.9077 17.7605 16.5209 18.1473C16.1341 18.534 15.6095 18.7513 15.0625 18.7513H12.3125C12.0415 18.7513 11.7732 18.698 11.5229 18.5942C11.2726 18.4905 11.0451 18.3384 10.8536 18.1468C10.6621 17.9551 10.5102 17.7276 10.4066 17.4772C10.303 17.2268 10.2498 16.9584 10.25 16.6875V13.25C10.25 13.0676 10.1776 12.8928 10.0486 12.7638C9.91971 12.6349 9.74484 12.5625 9.5625 12.5625H8.1875C8.00516 12.5625 7.8303 12.6349 7.70136 12.7638C7.57243 12.8928 7.5 13.0676 7.5 13.25V16.6875C7.5 17.2345 7.2827 17.7591 6.89591 18.1459C6.50911 18.5327 5.98451 18.75 5.4375 18.75H2.6875C2.14049 18.75 1.61589 18.5327 1.22909 18.1459C0.842299 17.7591 0.625 17.2345 0.625 16.6875V9.02872C0.625 8.46222 0.85875 7.9191 1.27125 7.52997L7.93038 1.23522ZM8.875 2.23347L2.2145 8.53097C2.14688 8.59507 2.093 8.67225 2.05613 8.75782C2.01926 8.84338 2.00016 8.93555 2 9.02872V16.6875C2 16.8698 2.07243 17.0447 2.20136 17.1736C2.3303 17.3025 2.50516 17.375 2.6875 17.375H5.4375C5.61984 17.375 5.7947 17.3025 5.92364 17.1736C6.05257 17.0447 6.125 16.8698 6.125 16.6875V13.25C6.125 12.703 6.3423 12.1784 6.72909 11.7916C7.11589 11.4048 7.64049 11.1875 8.1875 11.1875H9.5625C10.1095 11.1875 10.6341 11.4048 11.0209 11.7916C11.4077 12.1784 11.625 12.703 11.625 13.25V16.6875C11.625 16.8698 11.6974 17.0447 11.8264 17.1736C11.9553 17.3025 12.1302 17.375 12.3125 17.375H15.0625C15.2448 17.375 15.4197 17.3025 15.5486 17.1736C15.6776 17.0447 15.75 16.8698 15.75 16.6875V9.02872C15.75 8.93532 15.731 8.84289 15.6941 8.75707C15.6573 8.67126 15.6033 8.59386 15.5355 8.5296L8.875 2.23347Z"
                fill="#637D92"
              />
            </svg>{" "}
            <span>Asosiy</span>
          </NavLink>
          <NavLink className="navlink" to="/customers">
            <svg
              width="23"
              height="15"
              viewBox="0 0 23 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.7014 10.0713C11.6229 9.45784 12.3224 8.56417 12.6966 7.5224C13.0709 6.48064 13.0999 5.3461 12.7795 4.28656C12.4591 3.22701 11.8062 2.29871 10.9173 1.63893C10.0285 0.979153 8.95095 0.622925 7.84401 0.622925C6.73707 0.622925 5.65951 0.979153 4.77068 1.63893C3.88186 2.29871 3.22896 3.22701 2.90852 4.28656C2.58809 5.3461 2.61714 6.48064 2.99137 7.5224C3.36561 8.56417 4.06516 9.45784 4.98658 10.0713C3.31982 10.6856 1.89636 11.8224 0.928616 13.312C0.877754 13.3876 0.842426 13.4725 0.824684 13.5619C0.806942 13.6512 0.807141 13.7432 0.825268 13.8325C0.843396 13.9218 0.879091 14.0066 0.930278 14.082C0.981466 14.1574 1.04712 14.2218 1.12344 14.2716C1.19975 14.3214 1.2852 14.3555 1.37481 14.3719C1.46442 14.3884 1.55641 14.3869 1.64543 14.3675C1.73446 14.3481 1.81873 14.3112 1.89337 14.2589C1.968 14.2067 2.0315 14.1401 2.08018 14.0631C2.70442 13.103 3.55861 12.314 4.56518 11.7678C5.57175 11.2217 6.69881 10.9356 7.84401 10.9356C8.98921 10.9356 10.1163 11.2217 11.1228 11.7678C12.1294 12.314 12.9836 13.103 13.6078 14.0631C13.7087 14.2129 13.8644 14.3171 14.0415 14.353C14.2185 14.389 14.4025 14.3538 14.5538 14.2551C14.7051 14.1564 14.8115 14.0022 14.85 13.8257C14.8884 13.6492 14.8559 13.4647 14.7594 13.312C13.7917 11.8224 12.3682 10.6856 10.7014 10.0713ZM4.06276 5.78127C4.06276 5.03341 4.28452 4.30234 4.70001 3.68052C5.1155 3.05869 5.70605 2.57404 6.39698 2.28785C7.08792 2.00165 7.8482 1.92677 8.58169 2.07267C9.31518 2.21857 9.98894 2.5787 10.5178 3.10752C11.0466 3.63634 11.4067 4.31009 11.5526 5.04358C11.6985 5.77707 11.6236 6.53736 11.3374 7.22829C11.0512 7.91922 10.5666 8.50977 9.94476 8.92526C9.32293 9.34075 8.59187 9.56252 7.84401 9.56252C6.84151 9.56138 5.88039 9.16263 5.17151 8.45376C4.46264 7.74488 4.06389 6.78377 4.06276 5.78127ZM22.1217 14.2633C21.969 14.3629 21.7829 14.3977 21.6045 14.3602C21.4261 14.3226 21.2699 14.2158 21.1703 14.0631C20.5468 13.1024 19.6928 12.3131 18.686 11.7671C17.6792 11.2212 16.5518 10.936 15.4065 10.9375C15.2242 10.9375 15.0493 10.8651 14.9204 10.7362C14.7914 10.6072 14.719 10.4324 14.719 10.25C14.719 10.0677 14.7914 9.89281 14.9204 9.76388C15.0493 9.63495 15.2242 9.56252 15.4065 9.56252C15.9634 9.56199 16.5132 9.43848 17.0168 9.20082C17.5204 8.96315 17.9653 8.6172 18.3196 8.18767C18.674 7.75814 18.9292 7.25564 19.0668 6.71607C19.2045 6.17651 19.2213 5.6132 19.116 5.06639C19.0107 4.51959 18.786 4.00278 18.4578 3.5529C18.1297 3.10303 17.7062 2.73118 17.2176 2.46394C16.7291 2.19669 16.1876 2.04065 15.6318 2.00695C15.0759 1.97325 14.5195 2.06273 14.0023 2.269C13.918 2.30546 13.8272 2.32464 13.7353 2.32542C13.6434 2.32619 13.5523 2.30855 13.4674 2.27352C13.3825 2.2385 13.3054 2.1868 13.2408 2.12149C13.1762 2.05618 13.1253 1.97858 13.0912 1.89327C13.057 1.80797 13.0404 1.71669 13.0421 1.62483C13.0439 1.53297 13.064 1.44239 13.1014 1.35845C13.1387 1.27451 13.1925 1.19891 13.2596 1.13611C13.3266 1.07331 13.4056 1.02459 13.4918 0.992829C14.6756 0.520733 15.9922 0.503744 17.1878 0.94514C18.3833 1.38654 19.373 2.25504 19.966 3.38311C20.559 4.51118 20.7132 5.81888 20.3989 7.05393C20.0846 8.28899 19.324 9.36389 18.2639 10.0713C19.9307 10.6856 21.3542 11.8224 22.3219 13.312C22.4215 13.4647 22.4563 13.6507 22.4188 13.8291C22.3812 14.0075 22.2744 14.1637 22.1217 14.2633Z"
                fill="#637D92"
              />
            </svg>
            <span>Mijozlar</span>
          </NavLink>
          <NavLink className="navlink" to="/reports">
            <svg
              width="19"
              height="17"
              viewBox="0 0 19 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.125 2.99996V12.9C1.125 13.9267 1.125 14.4397 1.32482 14.8319C1.50059 15.1769 1.78085 15.4579 2.12581 15.6337C2.5176 15.8333 3.03074 15.8333 4.0555 15.8333H14.6945C15.7193 15.8333 16.2317 15.8333 16.6234 15.6337C16.9684 15.4579 17.2496 15.1771 17.4254 14.8321C17.6252 14.4399 17.6252 13.9265 17.6252 12.8998L17.6252 5.93309C17.6252 4.90633 17.6252 4.39294 17.4254 4.00077C17.2496 3.65581 16.9686 3.37555 16.6236 3.19978C16.2315 2.99996 15.7184 2.99996 14.6917 2.99996H9.375M1.125 2.99996H9.375M1.125 2.99996C1.125 1.98744 1.94581 1.16663 2.95833 1.16663H6.32664C6.77506 1.16663 6.99979 1.16663 7.21079 1.21728C7.39785 1.26219 7.57636 1.33645 7.7404 1.43697C7.92535 1.55031 8.08416 1.70912 8.40104 2.026L9.375 2.99996"
                stroke="#637D92"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>Hisobotlar</span>
          </NavLink>
          <NavLink className="navlink" to="/settings">
            <svg
              width="21"
              height="19"
              viewBox="0 0 21 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.7791 6.67935L17.4434 6.4926C17.3913 6.4636 17.3657 6.44905 17.3405 6.43397C17.0901 6.28401 16.8791 6.07683 16.7252 5.82896C16.7097 5.80402 16.6951 5.77786 16.6652 5.72617C16.6354 5.67454 16.6203 5.64838 16.6064 5.62248C16.4683 5.36461 16.3936 5.07722 16.3891 4.78472C16.3887 4.75532 16.3888 4.72527 16.3898 4.66554L16.3963 4.27572C16.4068 3.6519 16.4121 3.33902 16.3244 3.05823C16.2466 2.80882 16.1163 2.5791 15.9423 2.38415C15.7457 2.16378 15.4735 2.00656 14.9285 1.69253L14.4759 1.43169C13.9325 1.11853 13.6606 0.9619 13.3721 0.902187C13.1169 0.84936 12.8535 0.851808 12.5992 0.908901C12.3121 0.973338 12.0437 1.13405 11.5072 1.4553L11.5042 1.45675L11.1798 1.65096C11.1285 1.68167 11.1026 1.69715 11.0769 1.71144C10.8218 1.85326 10.537 1.93168 10.2453 1.94105C10.2159 1.94199 10.186 1.94199 10.1262 1.94199C10.0668 1.94199 10.0356 1.94199 10.0062 1.94105C9.7139 1.93164 9.42854 1.85279 9.17305 1.71038C9.1473 1.69603 9.12183 1.68043 9.07044 1.64958L8.74404 1.45362C8.20387 1.12933 7.93338 0.966946 7.64475 0.902187C7.3894 0.844894 7.12509 0.843308 6.86891 0.896816C6.57966 0.957232 6.30779 1.11503 5.76403 1.43061L5.76162 1.43169L5.31459 1.69113L5.30964 1.69416C4.77079 2.00691 4.50071 2.16366 4.30572 2.38313C4.13269 2.57788 4.00336 2.80724 3.92595 3.056C3.83845 3.33717 3.84311 3.65071 3.85365 4.27747L3.8602 4.66674C3.8612 4.72569 3.86292 4.75498 3.86249 4.78398C3.85815 5.07707 3.78245 5.36504 3.64393 5.62338C3.63023 5.64893 3.61547 5.67448 3.586 5.72551C3.5565 5.77658 3.54221 5.80197 3.52691 5.82662C3.37225 6.07581 3.16029 6.28421 2.90839 6.43441C2.88347 6.44927 2.85721 6.46356 2.80561 6.49215L2.47418 6.67582C1.92274 6.98141 1.64709 7.13434 1.44651 7.35197C1.26907 7.5445 1.13502 7.77286 1.0532 8.02157C0.960706 8.30271 0.960784 8.61797 0.962216 9.24842L0.963387 9.7637C0.964809 10.3899 0.96676 10.7028 1.05946 10.9821C1.14147 11.2291 1.27454 11.4561 1.45099 11.6475C1.65043 11.8638 1.92334 12.0158 2.4706 12.3202L2.79908 12.503C2.85498 12.5341 2.88311 12.5494 2.91007 12.5657C3.15969 12.716 3.36998 12.9238 3.52333 13.1716C3.5399 13.1983 3.5558 13.2261 3.5876 13.2817C3.61901 13.3365 3.63508 13.364 3.64961 13.3915C3.78406 13.646 3.85604 13.9289 3.86095 14.2167C3.86148 14.2478 3.86103 14.2792 3.85996 14.3425L3.85365 14.716C3.84304 15.3449 3.83841 15.6597 3.92643 15.9417C4.00429 16.1911 4.13444 16.4208 4.30841 16.6158C4.50506 16.8361 4.77767 16.9933 5.32265 17.3073L5.77521 17.5681C6.31866 17.8812 6.59028 18.0377 6.8788 18.0974C7.13404 18.1502 7.39759 18.1482 7.65191 18.0911C7.93936 18.0266 8.20869 17.8653 8.74672 17.5431L9.07106 17.3489C9.12237 17.3182 9.14836 17.3028 9.17406 17.2885C9.42915 17.1467 9.71363 17.0678 10.0053 17.0585C10.0347 17.0575 10.0646 17.0575 10.1245 17.0575C10.1844 17.0575 10.2143 17.0575 10.2437 17.0585C10.5361 17.0679 10.8223 17.147 11.0778 17.2894C11.1003 17.3019 11.1228 17.3155 11.1623 17.3392L11.5071 17.5462C12.0474 17.8706 12.3173 18.0325 12.6059 18.0972C12.8613 18.1545 13.1258 18.1568 13.382 18.1033C13.6711 18.0429 13.9436 17.8848 14.487 17.5694L14.9408 17.3061C15.48 16.9931 15.7503 16.8362 15.9454 16.6167C16.1184 16.4219 16.2479 16.1926 16.3253 15.9439C16.4122 15.6648 16.407 15.3536 16.3966 14.7359L16.3898 14.3331C16.3888 14.2741 16.3887 14.2448 16.3891 14.2158C16.3935 13.9227 16.4679 13.6345 16.6064 13.3762C16.6201 13.3507 16.635 13.3249 16.6644 13.2741C16.6939 13.223 16.7091 13.1975 16.7244 13.1729C16.8791 12.9237 17.0913 12.7151 17.3432 12.5649C17.3678 12.5502 17.3931 12.5362 17.4435 12.5083L17.4452 12.5075L17.7766 12.3238C18.3281 12.0182 18.6043 11.8651 18.8048 11.6475C18.9823 11.455 19.1162 11.2269 19.198 10.9782C19.2899 10.6987 19.2892 10.3853 19.2878 9.76223L19.2866 9.23589C19.2852 8.60965 19.2844 8.29678 19.1917 8.01754C19.1097 7.7705 18.9759 7.54348 18.7994 7.35211C18.6002 7.13602 18.3269 6.98398 17.7807 6.68013L17.7791 6.67935Z"
                stroke="#637D92"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.45864 9.49996C6.45864 11.525 8.10026 13.1666 10.1253 13.1666C12.1503 13.1666 13.792 11.525 13.792 9.49996C13.792 7.47492 12.1503 5.8333 10.1253 5.8333C8.10026 5.8333 6.45864 7.47492 6.45864 9.49996Z"
                stroke="#637D92"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>Sozlamalar</span>
          </NavLink>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
