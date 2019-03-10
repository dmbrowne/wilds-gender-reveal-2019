import * as React from 'react'
import styles from './separated-character-input.module.css';

type OnChangeEvent = React.ChangeEvent<HTMLInputElement>;

interface IProps {
  maxLength: number;
  defaultValue?: string;
  renderCharacterInput: (
    character: string,
    onchange: (e: OnChangeEvent) => any,
    inputProps: React.InputHTMLAttributes<HTMLInputElement> & { ref: React.RefObject<HTMLInputElement> },
    meta?: {
      focused: boolean;
    }
  ) => any;
  onChange?: (value: string) => any;
  spacing?: number;
}

interface IState {
  activeInputIdx: number;
  splitValues: string[];
}

export default class SeparatedCharacterInput extends React.Component<IProps, IState> {
  inputRefs: React.RefObject<HTMLInputElement>[];

  constructor(props: IProps) {
    super(props);
    const { defaultValue = '', maxLength } = props;
    const characterLengthArray = new Array(maxLength).fill(undefined)
    this.state = {
      activeInputIdx: 0,
      splitValues: characterLengthArray.map((_, idx) => defaultValue.charAt(idx)),
    }
    this.inputRefs = characterLengthArray.map(() => React.createRef())
  }

  updateCharacterValue = (idx: number) => ({ target: { value }}: OnChangeEvent) => {
    const { onChange } = this.props;
    const { splitValues } = this.state;
    const newValue = [...splitValues];
    const nextInputRef = this.inputRefs[idx + 1];

    newValue[idx] = value;
    this.setState({ splitValues: newValue });
    
    if (onChange) {
      onChange(newValue.join(''));
    }
  
    if (value && nextInputRef) {
      this.updateActiveInputIdx(idx + 1)
      nextInputRef.current && nextInputRef.current.focus();
    }
  }

  onInput = (idx: number) => (e: any) => {
    const { value } = e.currentTarget;
    const nextInputRef = this.inputRefs[idx + 1];

    if (value && e.currentTarget.value === value && nextInputRef && nextInputRef.current) {
      this.updateActiveInputIdx(idx + 1)
      nextInputRef.current.focus();
      nextInputRef.current.select();
    }
  }

  onKeyDown = (idx: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.keyCode || e.charCode;
    const isDeleteKey = (key == 8 || key == 46);
    const prevInputRef = this.inputRefs[idx - 1];
    const currentInput = this.inputRefs[idx].current;
    const currentValue = currentInput && currentInput.value;

    if (isDeleteKey && !currentValue && prevInputRef && prevInputRef.current) {
      this.updateActiveInputIdx(idx - 1)
      prevInputRef.current.focus();
      prevInputRef.current.select();
    }
  }

  updateActiveInputIdx(idx: number) {
    this.setState({ activeInputIdx: idx })
  }

  onCharacterInputClick = (idx: number) => {
    this.updateActiveInputIdx(idx);
    const inputRef = this.inputRefs[idx]
    if (inputRef.current) {
      inputRef.current.select()
    }
  }

  render() {
    const { splitValues, activeInputIdx } = this.state;
    const { renderCharacterInput, maxLength, spacing } = this.props;
    return (
      <div
        className={styles.container}
        style={{
          gridTemplateColumns: `repeat(${maxLength}, 1fr)`,
          gridGap: spacing,
        }}
      >
        {splitValues.map((character, idx) => {
          return (
            <span
              style={{ }}
              key={`character-input-${idx}`}
              onClick={() => this.onCharacterInputClick(idx)}
            >
              {renderCharacterInput(
                character,
                this.updateCharacterValue(idx),
                {
                  maxLength: 1,
                  ref: this.inputRefs[idx],
                  onInput: this.onInput(idx),
                  onKeyDown: this.onKeyDown(idx),
                  onMouseUp: () => false,
                },
                { focused: activeInputIdx === idx },
              )}
            </span>
          )
        })}
      </div>
    )
  }
}

SeparatedCharacterInput.defaultProps = {
  spacing: 16,
}