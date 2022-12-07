namespace Application.Core
{
    // a common class to handle errors and exceptions
    public class ErrorResult<T>
    {
        public bool IsSuccess { get; set; }
        public T Value { get; set; }
        public string Error { get; set; }


        public static ErrorResult<T> Success(T value) => new ErrorResult<T>
        { IsSuccess = true, Value = value };

        public static ErrorResult<T> Failure(string error) => new ErrorResult<T>
        { IsSuccess = false, Error = error };
    }
}