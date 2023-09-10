const Checked = ({
  ...props
}) => {
  return (
    <svg {...props} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect opacity="0.1" width="40" height="40" rx="8" fill="#0E4DA4"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M27 11H13C11.9 11 11 11.9 11 13V27C11 28.1 11.9 29 13 29H27C28.1 29 29 28.1 29 27V13C29 11.9 28.1 11 27 11ZM18 25L13 20L14.4 18.6L18 22.2L25.6 14.6L27 16L18 25Z" fill="#0E4DA4"/>
    </svg>
  )
}

export default Checked