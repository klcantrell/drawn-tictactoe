export default function GamePrompts(controller) {
  const coreProps = (state) => {
  	const rootEl = state.root;
    let	buttonEls,
        bindEvents;

    if (state.buttons === 1) {
      buttonEls = rootEl.querySelector("button"),
      bindEvents = () => {
        buttonEls.addEventListener('click', state.handler);
      };
    } else if (state.buttons === 2) {
    	buttonEls = rootEl.querySelectorAll("button"),
      bindEvents = () => {
        let buttons = Array.from(buttonEls);
        buttons.forEach((button) => {
          button.addEventListener('click', state.handler);
        });
      };
    }
    const slideIn = () => {
      setTimeout(() => {
        rootEl.classList.add("message--slide-in");
      }, 100);
    };

    const slideOut = () => {
      setTimeout(() => {
        rootEl.classList.remove("message--slide-in");
      }, 100);
    };
    return {
    	init: function() {
      	bindEvents();
      },
      slideIn: slideIn,
      slideOut: slideOut
    };
  };

  const specialMessageProps = (state) => {
  	let messageEl = state.root.querySelector(state.messageEl);
    return {
    	setMessage: () => {
      	let message = controller.getVerdict() ?
           `${controller.getVerdict()} wins!` :
           'draw!';
      	messageEl.textContent = message;
      }
    };
  };

  const gameStart = (() => {
    let state = {
      root: document.getElementById('game-start'),
      buttons: 2,
      handler: controller.startGame.bind(controller)
    };
    return Object.assign(
      {},
      coreProps(state)
    );
  })();

  const idle = (() => {
    let state = {
      root: document.getElementById("idle-message"),
      buttons: 1,
      handler: () => {
        controller.processPlayerActive();
        controller.hideIdleMessage();
      }
    };
    return Object.assign(
      {},
      coreProps(state)
    );
  })();

  const chooseAnother = (() => {
    let state = {
      root: document.getElementById('choose-message'),
      buttons: 1,
      handler: controller.hideChooseMessage
    };
    return Object.assign(
      {},
      coreProps(state)
    );
  })();

  const gameEnd = (() => {
    let state = {
      root: document.getElementById('game-end'),
      buttons: 1,
      messageEl: '.message__verdict',
      handler: controller.resetGame
    };
    return Object.assign(
      {},
      coreProps(state),
      specialMessageProps(state)
    );
  })();

  return {
    gameStart,
    idle,
    chooseAnother,
    gameEnd
  }
}
