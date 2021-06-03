module Newebpay

  def encrypt_aes_sha256_uppercase(transaction_information, key, iv)
    result = encrypt_aes(transaction_information, key, iv)
    result = 'HashKey=' + key + '&' + result + '&HashIV=' + iv  
    result = Digest::SHA256.hexdigest(result)
    result.upcase
  end

  def encrypt_aes(transaction_information, key, iv)
    result = http_build_query(transaction_information)
    result = addpadding(result)
    result = openssl_encrypt(result, key, iv)
    result = bin2hex(result)
    trim(result)
  end

  def http_build_query(informations)
    result = []
    for information in informations
      result_part = CGI.escape(information[0]) + '=' + CGI.escape(information[1])
      result.append(result_part)
    end
    result.join("&")
  end

  def addpadding(string, blocksize = 32)
    len = string.length
    pad = blocksize - (len % blocksize)
    string + pad.chr() * pad
  end

  def openssl_encrypt(string, key, iv, cipher_method = 'aes-256-cbc')
    cipher = OpenSSL::Cipher.new(cipher_method)
    cipher.encrypt
    cipher.iv = iv
    cipher.key = key
    cipher.update(string)
  end

  def bin2hex(bytes)
    bytes.unpack('H*')
  end

  def trim(data)
    data.first.strip
  end

  def aes_decrypt(trade_information, key, iv)
    result = hex2bin(trade_information)
    openssl_decrypt(result, key, iv)
  end

  def hex2bin(hex)
    [hex].pack('H*')
  end

  def openssl_decrypt(string, key, iv, cipher_method = 'aes-256-cbc')
    cipher = OpenSSL::Cipher.new(cipher_method)
    cipher.decrypt
    cipher.iv = iv
    cipher.key = key
    cipher.update(string)
  end

  def decode(trade_information_for_order_number)
    key = ENV["newebpay_key"]
    iv = ENV["newebpay_iv"]
    result = aes_decrypt(trade_information_for_order_number, key, iv)
    result = result.split("&")[5]
    order_number = result.partition('=').last
  end

end
