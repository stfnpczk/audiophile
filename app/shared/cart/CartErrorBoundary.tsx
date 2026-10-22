'use client';

import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class CartErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Cart error:', error);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className='flex flex-col items-center gap-4 p-8 text-center'>
          <p className='text-[15px] font-medium text-black/50'>
            Something went wrong loading your cart.
          </p>
          <button
            type='button'
            onClick={this.handleRetry}
            className='text-[13px] font-bold text-orange underline transition-colors can-hover:hover:text-lightOrange'
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
