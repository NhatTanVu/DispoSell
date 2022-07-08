package DispoSell.models;

public class Payment {
    private String chargeAmount;
    private String nonce;

    /** * @return the chargeAmount */
    public String getChargeAmount() {
        return chargeAmount;
    }

    /** * @param chargeAmount * the chargeAmount to set */
    public void setChargeAmount(String chargeAmount) {
        this.chargeAmount = chargeAmount;
    }

    /** * @return the nonce */
    public String getNonce() {
        return nonce;
    }

    /** * @param nonce * the nonce to set */
    public void setNonce(String nonce) {
        this.nonce = nonce;
    }
}
