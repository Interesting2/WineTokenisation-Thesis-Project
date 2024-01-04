import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  renderedComponents: ['home'],
};

const renderSlice = createSlice({
  name: 'render',
  initialState,
  reducers: {
    renderComponent(state, action) {
      state.renderedComponents.push(action.payload);
    },
    unrenderComponent(state) {
        const lastComponent = state.renderedComponents[state.renderedComponents.length - 1];
  
        while (state.renderedComponents.length > 0 && state.renderedComponents[state.renderedComponents.length - 1] === lastComponent) {
            state.renderedComponents.pop();
        }
    },
      resetRenderedComponents(state) {
            state.renderedComponents = ['home'];
      }
  },
});

export const { renderComponent, unrenderComponent, resetRenderedComponents} = renderSlice.actions;
export default renderSlice.reducer;
