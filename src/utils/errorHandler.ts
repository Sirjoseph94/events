function handleError(error: Record<string, string|number>){
  return(
    {
      status: "failed",
      statusCode: error.statusCode,
      reason: error.message, 
    }
  )
}