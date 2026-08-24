package core

type TilloError struct {
	IsTilloError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewTilloError(code string, msg string, ctx *Context) *TilloError {
	return &TilloError{
		IsTilloError: true,
		Sdk:              "Tillo",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *TilloError) Error() string {
	return e.Msg
}
