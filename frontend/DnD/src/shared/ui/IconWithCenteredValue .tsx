import { styled } from '@mui/system';
import { ReactNode } from 'react';

const IconContainer = styled('div')({
  position: 'relative',
  display: 'inline-block',
});

export const iconWithCenteredValueFont = {
    fontSize: 16,
    fontWeight: "normal",
    fontColor: "",
}

const CenteredValue = styled('span')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -60%)',
  fontSize: iconWithCenteredValueFont.fontSize, 
  fontWeight: iconWithCenteredValueFont.fontWeight, 
  pointerEvents: 'none',
});


const IconWithCenteredValue = ({ icon, value }: {value: number | string, icon: ReactNode}) => {
    return (
      <IconContainer>
        {icon}
        <CenteredValue>{value}</CenteredValue>
      </IconContainer>
    );
  };
  
  export default IconWithCenteredValue;
  