import React from 'react';

const Footer: React.FC = () => {
  const token = sessionStorage.getItem('token');

  return (
    <footer>
      <div className={token ? 'element' : 'hidden'}>
        <div className='location'>
          <img
            src='https://img.icons8.com/?size=50&id=8o7BHnFtWFwV&format=gif'
            alt='partner'
          />
          <h4>PARTNERS</h4>
        </div>
        <a
          href='https://www.uspoloassn.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <p>USPOLO</p>
        </a>
        <a
          href='https://www.peterengland.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <p>PETER ENGLAND</p>
        </a>
        <a
          href='https://www.lenovo.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <p>LENOVO</p>
        </a>
      </div>

      <div className={token ? 'element' : 'hidden'}>
        <div className='location'>
          <img
            src='https://i.pinimg.com/originals/cf/83/db/cf83db51e7a566b33aa2dfdb15536dcc.gif'
            alt='onlinestore'
          />
          <div className='overlay'></div>
          <h4>ONLINE STORES</h4>
        </div>
        <a
          href='https://www.myntra.com/?utm_source=dms_bing&utm_medium=dms_bing_cpc&utm_campaign=dms_bing_Brand_Exact_Desktop&utm_adgroup=Myntra_Shirt&keyword=myntra%20men%20shirts&matchtype=e&utm_source=bing&msclkid=a4ceebcbbd06163e0d7c8d0d6930845c&utm_term=myntra%20men%20shirts&utm_content=Myntra_Shirt'
          target='_blank'
          rel='noopener noreferrer'
        >
          <p>MEN CLOTHING</p>
        </a>
        <a
          href='https://www.bing.com/search?q=flipkart+women%27s+clothing&qs=LT&pq=flipkart+women&sk=AS2MT1UT3&sc=10-14&cvid=995908139F214B509161A988D65055AB&FORM=QBRE&sp=7&ghc=1&lq=0'
          target='_blank'
          rel='noopener noreferrer'
        >
          <p>WOMEN CLOTHING</p>
        </a>
        <a
          href='https://www.bing.com/shop?q=flipkart+laptop+for+students&FORM=SHOPPA&originIGUID=31D8492A8826444FADB7C8C7FBCC66B9'
          target='_blank'
          rel='noopener noreferrer'
        >
          <p>LAPTOPS FOR STUDENTS</p>
        </a>
      </div>

      <div className={token ? 'element' : 'hidden'}>
        <div className='location'>
          <img
            src='https://img.icons8.com/?size=48&id=aM7flMZy6COQ&format=gif'
            alt='address'
          />
          <h4>ADDRESS</h4>
        </div>
        <address>
          10/123-C,<br />
          HELL'S KITCHEN,<br />
          NEW YORK,<br />
        </address>
      </div>

      <h4 className={token ? 'hidden' : 'element'}>
        @copyright:mentracgio
      </h4>
    </footer>
  );
};

export default Footer;
