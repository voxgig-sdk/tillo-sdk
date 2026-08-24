-- Tillo SDK error

local TilloError = {}
TilloError.__index = TilloError


function TilloError.new(code, msg, ctx)
  local self = setmetatable({}, TilloError)
  self.is_sdk_error = true
  self.sdk = "Tillo"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function TilloError:error()
  return self.msg
end


function TilloError:__tostring()
  return self.msg
end


return TilloError
