describe('PreEmission', function() {

  it("constructs PreEmission object from a data", function(done) {
    let amount      = "200";
    let serialNumber = "test";
    let asset = "BLC";
    let keypair1 = StellarBase.Keypair.random();
    let keypair2 = StellarBase.Keypair.random();
    let keyPairs = [ keypair1, keypair2];
    var opts = {
        amount,
        serialNumber,
        asset,
        keyPairs
    }
    var preEmission = StellarBase.PreEmission.build(opts);
    var recovered = StellarBase.PreEmission.dataFromXdr(preEmission)
    expect(preEmission.serialNumber()).to.be.equal(serialNumber);
    expect(preEmission.asset()).to.be.equal(asset);
    expect(preEmission.signatures().length).to.be.equal(keyPairs.length);
    expect(recovered.serialNumber).to.be.equal(serialNumber);
    expect(recovered.amount).to.be.equal(amount);
    done();
  });

  it("invalid amount", function(done) {
    let amount      = 0;
    let serialNumber = "test1234";
    let asset = "BLC";
    let keypair1 = StellarBase.Keypair.random();
    let keypair2 = StellarBase.Keypair.random();
    let keyPairs = [ keypair1, keypair2];
    var opts = {
        amount,
        serialNumber,
        asset,
        keyPairs
    }
    expect(() => StellarBase.PreEmission.build(opts)).to.throw(/amount must be of type String and represent a positive number/)
    done();
  });

  it("invalid serialNumber", function(done) {
    let amount      = "100";
    let serialNumber = "";
    let asset = "BLC";
    let keypair1 = StellarBase.Keypair.random();
    let keypair2 = StellarBase.Keypair.random();
    let keyPairs = [ keypair1, keypair2];
    var opts = {
        amount,
        serialNumber,
        asset,
        keyPairs
    }
    expect(() => StellarBase.PreEmission.build(opts)).to.throw(/serialNumber must be 4-64 string/)
    done();
  });

  it("invalid keypairs", function(done) {
    let amount      = "100";
    let serialNumber = "valid_serial";
    let asset = "BLC";
    let keyPairs = [1];
    var opts = {
        amount,
        serialNumber,
        asset,
        keyPairs
    }
    expect(() => StellarBase.PreEmission.build(opts)).to.throw(/must get array of keyparis/)
    done();
  });

  it("invalid asset", function(done) {
    let amount      = "100";
    let serialNumber = "valid_serial";
    let asset = "";
    let keypair1 = StellarBase.Keypair.random();
    let keypair2 = StellarBase.Keypair.random();
    let keyPairs = [ keypair1, keypair2];
    var opts = {
        amount,
        serialNumber,
        asset,
        keyPairs
    }
    expect(() => StellarBase.PreEmission.build(opts)).to.throw(/asset is invalid/)
    done();
  });

  it("test helpers", function(done) {
    let amount      = "200";
    let serialNumber = "test";
    let asset = "BLC";
    let keypair1 = StellarBase.Keypair.random();
    let keypair2 = StellarBase.Keypair.random();
    let keyPairs = [ keypair2 ];
    var opts = {
        amount,
        serialNumber,
        asset,
        keyPairs
    }
    var preEmission = StellarBase.PreEmission.build(opts);
    var dataFromXDR = StellarBase.PreEmission.dataFromXdr(preEmission)
    expect(StellarBase.PreEmission.isSigned(dataFromXDR, keypair2)).to.be.equal(true);
    expect(StellarBase.PreEmission.isSigned(dataFromXDR, keypair1)).to.be.equal(false);
    StellarBase.PreEmission.addSignature(dataFromXDR, keypair1);
    expect(StellarBase.PreEmission.isSigned(dataFromXDR, keypair1)).to.be.equal(true);
    var xdrFromData = StellarBase.PreEmission.xdrFromData(dataFromXDR);
    expect(xdrFromData.amount).to.be.equal(preEmission.amount);
    expect(xdrFromData.signatures).to.be.equal(preEmission.signatures);
    done();
  });
});
