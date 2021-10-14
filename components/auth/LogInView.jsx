import { Card } from '../forms/Card';
import LogInForm from '../forms/LoginForm';

const LogInView = ({ onClose }) => {
  return (
    <Card>
      <LogInForm onClose={onClose} />
    </Card>
  );
};

export default LogInView;
