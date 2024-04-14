import { Link } from 'react-router-dom';

const AlternateLink = ({ text, linkText, toLink }) => {
  return (
    <p className="text-sm font-medium text-gray-600 tracking-tight">
      {text}{' '}
      <Link
        className="text-black underline font-semibold hover:decoration-transparent"
        to={toLink}
      >
        {linkText}
      </Link>
    </p>
  );
};

export default AlternateLink;
