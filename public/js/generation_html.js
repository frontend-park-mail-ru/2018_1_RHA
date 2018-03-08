//we will insert modal before this element
const before_modal = document.getElementById('play_wrap');

const modalDiv = document.createElement('div');

const modalWidnowTemplate = '<div class="mainModPart" id="mainModPart">\n' +
    '            <ul class="tab-group">\n' +
    '                <li class="tab active" id="signin-li"><a href="#" data-section="signin">Sign in</a></li>\n' +
    '                <li class="tab " id="signup-li"><a href="#" data-section="signup">Sign up</a></li>\n' +
    '            </ul>\n' +
    '            <a  id="close" title="Закрыть" class="close">X</a>\n' +
    '            <section id="signin">\n' +
    '                <h1>Sign in</h1>\n' +
    '                <form class="js-signin-group">\n' +
    '                    <input required type ="text" name="nickname-in" id="nickname-in" placeholder="nickname">\n' +
    '                    <input required type ="password" name="password-in" id="password-in" placeholder="password">\n' +
    '                    <button type="submit" class="button button-block btn-in">Sign in</button>\n' +
    '                </form>\n' +
    '            </section>\n' +
    '            \n' +
    '            <section id="signup">\n' +
    '                <h1>Sign up</h1>\n' +
    '                <form class="js-signup-group" action="#">\n' +
    '                    <input required type ="text" name="nickname-up" id="nickname-up" placeholder="nickname">\n' +
    '                    <input required type ="email" name="email-up" id="email-up" placeholder="email">\n' +
    '                    <input required type ="password" name="password-up" id="password-up" placeholder="password">\n' +
    '                    <input required type ="password" name="password-up-repeat" id="password-up-repeat" placeholder="confirm password">\n' +
    '                    <button type="submit" class="button button-block btn-up">Sign up</button>\n' +
    '                </form>\n' +
    '            </section>\n' +
    '\n' +
    '        </div>';
modalDiv.className = "modalDialog fadeIn-Out hidden";
modalDiv.id = "openModal";
modalDiv.innerHTML = modalWidnowTemplate;

//this method inserts 'modalDiv' before second parameter
document.body.insertBefore(modalDiv, before_modal);