export interface UseCaseReponse<T> {
    isSuccess: boolean
    data?: T
    body?: T
    error?: Error
  }
  
  export interface UseCase<T> {
    execute(data: any): Promise<UseCaseReponse<T>>
  }