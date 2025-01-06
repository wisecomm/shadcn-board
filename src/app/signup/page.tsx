import React from 'react'

function page() {
  return (
    <div className='page'>
        <div className='page__container'>
            <div className='page__container__header'>
                <h1 className='page__container__header__title'>회원가입</h1>
            </div>
            <div className='page__container__body'>
                <form className='page__container__body__form'>
                    <div className='page__container__body__form__group'>
                        <label className='page__container__body__form__group__label'>이메일</label>
                        <input className='page__container__body__form__group__input' type='email' placeholder='이메일을 입력해주세요.' />
                    </div>
                    <div className='page__container__body__form__group'>
                        <label className='page__container__body__form__group__label'>비밀번호</label>
                        <input className='page__container__body__form__group__input' type='password' placeholder='비밀번호를 입력해주세요.' />
                    </div>
                    <div className='page__container__body__form__group'>
                        <label className='page__container__body__form__group__label'>비밀번호 확인</label>
                        <input className='page__container__body__form__group__input' type='password' placeholder='비밀번호를 다시 입력해주세요.' />
                    </div>
                    <button className='page__container__body__form__button'>회원가입</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default page